import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi/api";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToCloseTicketForNewSupplier() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe(
    "close-ticket-new-supplier",
    async function ({ task, taskService }) {
      console.log("\n\n------------ CLOSE TICKET START ------------\n");

      const ticketId = task.variables.get("ticketID");
      const businessKey = task.businessKey;

      console.log("Variables: \n");
      console.log("Ticket ID: " + ticketId + "\n");
      console.log("Business Key: " + businessKey + "\n");

      const correlationMessageDto: CorrelationMessageDto = {
        messageName: "close-ticket-new-supplier",
        businessKey: businessKey,
        processVariables: {
          ticketId: { value: ticketId, type: "String" }
        },
      };
      await messageController.sendMessage(correlationMessageDto);
      console.log("\nMessage Sent!\n");
      
      await taskService.complete(task);
      console.log("\n------------ CLOSE TICKET END ------------\n\n");
      
      client.stop();
    }
  );
}
