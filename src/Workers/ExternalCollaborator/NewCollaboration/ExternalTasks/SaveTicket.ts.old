import { Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";
import { v4 } from "uuid";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToSaveTicket() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe("save-ticket", async function ({ task, taskService }) {
    console.log("\n\n------------ SAVE TICKET AND SEND INFO ------------\n");
    const ticketId = v4();
    const newProcessVariables = new Variables().set("ticket-id", ticketId);

    taskService.complete(task, newProcessVariables);
    console.log("\nTicket Saved!\n");

    console.log("\n------------SAVE TICKET TERMINATED------------\n\n");
    //client.stop();
  });
}
