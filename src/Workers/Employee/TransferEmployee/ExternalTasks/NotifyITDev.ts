import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToNotifyItDev() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe(
    "notify-it-developer",
    async function ({ task, taskService }) {
      console.log("\n\n------------ NOTIFY IT DEVELOPER ------------\n");

      const employeeID = task.variables.get("employee-id");
      const transferDetails = task.variables.get("transfer-details");
      const ticketId = task.variables.get("ticket-id");
      const ticketOpeningDate = task.variables.get("ticket-opening-date");
      const businessKey = task.businessKey;

      console.log("Variables: \n");
      console.log("Employee ID: " + employeeID + "\n");
      console.log("Transfer Details: " + transferDetails + "\n");
      console.log("Ticket ID: " + ticketId + "\n");
      console.log("Ticket Opening Date: " + ticketOpeningDate + "\n");
      console.log("Business Key: " + businessKey + "\n");

      const correlationMessageDto: CorrelationMessageDto = {
        messageName: "notify-it-message",
        businessKey: businessKey,
        processVariables: {
          employeeID: { value: employeeID, type: "String" },
          transferDetails: { value: transferDetails, type: "String" },
          ticketId: { value: ticketId, type: "String" },
          ticketOpeningDate: { value: ticketOpeningDate, type: "String" },
        },
      };
      await taskService.complete(task);
      await messageController.sendMessage(correlationMessageDto);
      console.log("\nMessage Sent!\n");

      console.log("\n------------SEND INFO TERMINATED------------\n\n");
    }
  );
}
