import { Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";
import { v4 } from "uuid";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToUpdateTicket() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe("update-ticket", async function ({ task, taskService }) {
    console.log("\n\n------------ UPDATE TICKET AND SEND INFO ------------\n");

    taskService.complete(task);
    console.log("\nTicket Updated!\n");

    console.log("\n------------ UPDATE TICKET TERMINATED------------\n\n");
    //client.stop();
  });
}
