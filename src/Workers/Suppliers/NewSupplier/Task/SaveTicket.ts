import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";
import { v4 } from "uuid";
import { Variables } from "camunda-external-task-client-js";

export async function subToSaveTicketForNewSupplier() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  client.subscribe("save-ticket-new-supplier", async function ({ task, taskService }) {
    console.log("\n\n------------ SAVE TICKET  ------------\n");

    const ticketID = v4();

    const newProcessVariables = new Variables()
      .set("ticketID", ticketID);
    
    console.log("Ticket saved");
    
    await taskService.complete(task, newProcessVariables);

    console.log("\n------------SAVE TICKET TERMINATED------------\n\n");


    client.stop();
  });
}
