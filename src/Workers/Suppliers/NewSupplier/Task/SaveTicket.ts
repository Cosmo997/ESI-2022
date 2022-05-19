import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

export async function subToCloseTicketForTransfer() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe("save-ticket-new-supplier", async function ({ task, taskService }) {
    console.log("\n\n------------ SAVE TICKET  ------------\n");
    console.log("Ticket saved");
    await taskService.complete(task);
    console.log("\n------------SAVE TICKET TERMINATED------------\n\n");


    client.stop();
  });
}
