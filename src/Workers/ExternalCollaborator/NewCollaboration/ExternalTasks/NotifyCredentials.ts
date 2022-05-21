import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

export async function subToNotifyCredentials() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  client.subscribe(
    "notify-credentials",
    async function ({ task, taskService }) {
      console.log("\n\n------------ NOTIFY CREDENTIALS ------------\n");

      const employeeID = task.variables.get("employee-id");
      const transferDetails = task.variables.get("transfer-details");
      const ticketId = task.variables.get("ticket-id");
      const ticketOpeningDate = task.variables.get("ticket-opening-date");
      const ticketClosingDate = task.variables.get("ticket-closing-date");
      const businessKey = task.businessKey;

      // Notify New Assignment
      // TODO: Email?

      await taskService.complete(task);

      console.log(
        "\n------------ NOTIFY CREDENTIALS TERMINATED------------\n\n"
      );
      //client.stop();
    }
  );
}
