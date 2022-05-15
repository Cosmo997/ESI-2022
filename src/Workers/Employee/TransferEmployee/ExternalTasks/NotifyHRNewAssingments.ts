import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToNotifyNewAssignmentsHRDept() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe(
    "notify-new-assignments-hrdept",
    async function ({ task, taskService }) {
      console.log("\n\n------------ NOTIFY NEW ASSIGNMENTS HR ------------\n");

      const employeeID = task.variables.get("employee-id");
      const transferDetails = task.variables.get("transfer-details");
      const ticketId = task.variables.get("ticket-id");
      const ticketOpeningDate = task.variables.get("ticket-opening-date");
      const ticketClosingDate = task.variables.get("ticket-closing-date");
      const ticketStatus = task.variables.get("ticket-status");
      const businessKey = task.businessKey;

      console.log("Variables: \n");
      console.log("Employee ID: " + employeeID + "\n");
      console.log("Transfer Details: " + transferDetails + "\n");
      console.log("Ticket ID: " + ticketId + "\n");
      console.log("Ticket Opening Date: " + ticketOpeningDate + "\n");
      console.log("Ticket Closing Date: " + ticketClosingDate + "\n");
      console.log("Ticket Status: " + ticketStatus + "\n");
      console.log("Business Key: " + businessKey + "\n");

      // Notify HR Dept

      const correlationMessageDto: CorrelationMessageDto = {
        messageName: "notify-hrdept-message",
        businessKey: businessKey,
        processVariables: {
          employeeID: { value: employeeID, type: "String" },
          transferDetails: { value: transferDetails, type: "String" },
          ticketId: { value: ticketId, type: "String" },
          ticketOpeningDate: { value: ticketOpeningDate, type: "String" },
          ticketClosingDate: { value: ticketClosingDate, type: "String" },
          ticketStatus: { value: ticketStatus, type: "String" },
        },
      };
      await taskService.complete(task);
      await messageController.sendMessage(correlationMessageDto);

      console.log(
        "\n------------NOTIFY NEW ASSIGNMENTS HR TERMINATED------------\n\n"
      );
    }
  );
}
