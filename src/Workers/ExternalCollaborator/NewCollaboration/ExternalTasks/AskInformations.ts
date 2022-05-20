import { Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";
import { Collaborator } from "../../../../Model/Collaborator";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToAskInformations() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe("ask-information", async function ({ task, taskService }) {
    console.log("\n\n------------ ASK USER INFORMATIONS ------------\n");

    const collaboratorInfo: Collaborator = {
      name: "Giuseppe",
      surname: "Rossi",
    };
    const businessKey = task.businessKey;

    const correlationMessageDto: CorrelationMessageDto = {
      messageName: "ask-information-message",
      businessKey: businessKey,
      processVariables: {
        collaboratorInfo: {
          value: { name: "Giuseppe", surname: "Rossi" },
        },
      },
    };
    await taskService.complete(task);

    await messageController.sendMessage(correlationMessageDto);
    console.log("\nMessage Sent!\n");
    console.log(
      "\n------------ ASK USER INFORMATIONS TERMINATED ------------\n\n"
    );
    //client.stop();
  });
}
