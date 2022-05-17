import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToNotifyNewAssignmentsEmployee() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  client.subscribe(
    "notify-new-assignments-employee",
    async function ({ task, taskService }) {
      console.log("\n\n------------ NOTIFY NEW ASSIGNMENTS ------------\n");

      const employeeID = task.variables.get("employee-id");
      const transferDetails = task.variables.get("transfer-details");
      const ticketId = task.variables.get("ticket-id");
      const ticketOpeningDate = task.variables.get("ticket-opening-date");
      const ticketClosingDate = task.variables.get("ticket-closing-date");
      const businessKey = task.businessKey;

      console.log("Variables: \n");
      console.log("Employee ID: " + employeeID + "\n");
      console.log("Transfer Details: " + transferDetails + "\n");
      console.log("Ticket ID: " + ticketId + "\n");
      console.log("Ticket Opening Date: " + ticketOpeningDate + "\n");
      console.log("Ticket Closing Date: " + ticketClosingDate + "\n");
      console.log("Business Key: " + businessKey + "\n");

      // Notify New Assignment
      // TODO: Email?

      await taskService.complete(task);

      console.log(
        "\n------------NOTIFY NEW ASSIGNMENTS TERMINATED------------\n\n"
      );
      client.stop();
    }
  );
}
