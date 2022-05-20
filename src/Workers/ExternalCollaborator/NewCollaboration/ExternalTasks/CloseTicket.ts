import { Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToCloseTicket() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe("close-ticket", async function ({ task, taskService }) {
    console.log("\n\n------------ CLOSE TICKET AND SEND INFO ------------\n");
    const currentDate = new Date();

    const newProcessVariables = new Variables()
      .set("ticket-closing-date", currentDate)
      .set("ticket-status", "ok");

    const employeeID = task.variables.get("employee-id");
    const transferDetails = task.variables.get("transfer-details");
    const ticketId = task.variables.get("ticket-id");
    const ticketOpeningDate = task.variables.get("ticket-opening-date");
    const ticketClosingDate = newProcessVariables.get("ticket-closing-date");
    const businessKey = task.businessKey;

    const correlationMessageDto: CorrelationMessageDto = {
      messageName: "close-ticket-message",
      businessKey: businessKey,
      processVariables: {
        employeeID: { value: employeeID, type: "String" },
        transferDetails: { value: transferDetails, type: "String" },
        ticketId: { value: ticketId, type: "String" },
        ticketOpeningDate: { value: ticketOpeningDate, type: "String" },
        ticketClosingDate: { value: ticketClosingDate, type: "String" },
      },
    };

    await taskService.complete(task, newProcessVariables);

    await messageController.sendMessage(correlationMessageDto);
    console.log("\nMessage Sent!\n");
    console.log("\n------------SEND INFO TERMINATED------------\n\n");

    //client.stop();
  });
}
