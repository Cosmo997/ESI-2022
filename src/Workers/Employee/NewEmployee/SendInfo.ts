import { ClientManager } from "../../../client";
import { baseUrl } from "../../../config/camunda-config";
import { MessageController } from "../../../APIController/message_controller";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";


/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToSendNewEmployeeInformationServiceTask() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getCLient();

  const messageController = new MessageController();

  client.subscribe("send-info", async function ({ task, taskService }) {
    const email = task.variables.get("email");
    const nome = task.variables.get("nome");
    const cognome = task.variables.get("cognome");
    const id = task.variables.get("ID");

    const businessKey = task.businessKey;

    console.log("Business Key: " + businessKey);
  
    const correlationMessageDto: CorrelationMessageDto = {
      messageName: "info",
      businessKey: businessKey,
      processVariables: {
        email: { value: email, type: "String" },
        nome: { value: nome, type: "String" },
        cognome: { value: cognome, type: "String" },
        ID: { value: id, type: "String" },
      },
    };
    await taskService.complete(task);
    await messageController.sendMessage(correlationMessageDto);
    console.log("\nMessage Sent!");
  });
}
