import { ClientManager } from "../../../client";
import { baseUrl } from "../../../config/camunda-config";
import { MessageController } from "../../../APIController/message_controller";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";

/**
 * Prendere le variabili email, nome, cognome, id e needed-information ed inviarle
 */
export function sendEmail(){


    const clientManager = new ClientManager(baseUrl);

    const client = clientManager.getCLient();

    const messageController = new MessageController();
  

  client.subscribe('send-email',async function ({task, taskService}) {
    
    const email = task.variables.get("email");
    const nome = task.variables.get("nome");
    const cognome = task.variables.get("cognome");
    const id = task.variables.get("ID");
    const neededInfo = task.variables.get("needed-info");
    const businessKey = task.businessKey;

    await taskService.complete(task);

    const correlationMessageDto: CorrelationMessageDto = {
      messageName: "email",
      businessKey: businessKey,
      processVariables: {
        email: { value: email, type: "String" },
        nome: { value: nome, type: "String" },
        cognome: { value: cognome, type: "String" },
        ID: { value: id, type: "String" },
        neededInfo: {value: neededInfo, type: "String"}
      },
    };

    await messageController.sendMessage(correlationMessageDto);


  });
}

