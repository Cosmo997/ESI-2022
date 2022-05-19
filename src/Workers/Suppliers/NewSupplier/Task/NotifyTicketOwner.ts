import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi/api";
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
    "notify-ticket-owner-new-supplier",
    async function ({ task, taskService }) {
      console.log("\n\n------------ NOTIFY TICKET OWNER NEW SUPPLIER START ------------\n");

      const ticketId = task.variables.get("ticket-id");
      const businessKey = task.businessKey;

      console.log("Variables: \n");
      console.log("Ticket ID: " + ticketId + "\n");
      console.log("Business Key: " + businessKey + "\n");

      const correlationMessageDto: CorrelationMessageDto = {
        messageName: "notify-ticket-owner-message-new-supplier",
        businessKey: businessKey,
        processVariables: {
          ticketId: { value: ticketId, type: "String" },
        },
      };
      await taskService.complete(task);
      await messageController.sendMessage(correlationMessageDto);
      console.log("\nMessage Sent!\n");

      console.log(
        "\n------------ NOTIFY TICKET OWNER NEW SUPPLIER TERMINATED ------------\n\n"
      );
      client.stop();
    }
  );
}
