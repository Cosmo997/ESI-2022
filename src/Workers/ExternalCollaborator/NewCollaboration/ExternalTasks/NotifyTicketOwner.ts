import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToNotifyTicketOwner() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe(
    "notify-ticket-owner",
    async function ({ task, taskService }) {
      console.log("\n\n------------ NOTIFY TICKET OWNER ------------\n");
      const businessKey = task.businessKey;

      const correlationMessageDto: CorrelationMessageDto = {
        messageName: "notify-ticket-owner-message",
        businessKey: businessKey,
        processVariables: {},
      };

      await taskService.complete(task);

      await messageController.sendMessage(correlationMessageDto);
      console.log("\nMessage Sent!\n");
      console.log(
        "\n------------ NOTIFY TICKET OWNER TERMINATED ------------\n\n"
      );
      //client.stop();
    }
  );
}
