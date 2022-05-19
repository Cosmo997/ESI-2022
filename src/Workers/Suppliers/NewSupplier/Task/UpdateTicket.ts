import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

export async function subToCloseTicketForTransfer() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  client.subscribe("update-ticket-new-supplier", async function ({ task, taskService }) {
    console.log("\n\n------------ UPDATE TICKET  ------------\n");
    console.log("Ticket updated");
    await taskService.complete(task);
    console.log("\n------------UPDATE TICKET TERMINATED------------\n\n");


    client.stop();
  });
}
