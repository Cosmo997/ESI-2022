import { Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";


export async function subToOpenTicketForSupplier() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe("open-ticket-new-supplier", async function ({ task, taskService }) {
    console.log("\n\n------------ OPEN TICKET AND SEND INFO ------------\n");
    const currentDate = new Date();
    const newProcessVariables = new Variables().set(
      "ticket-opening-date",
      currentDate
    );

    const supplierName = task.variables.get("supplier-name");
    const supplierInfo = task.variables.get("supplier-info");
    const ticketOpeningDate = newProcessVariables.get("ticket-opening-date");
    const app1 = task.variables.get("app1");
    const app2 = task.variables.get("app2");
    const app3 = task.variables.get("app3");
    const app4 = task.variables.get("app4");
    const businessKey = task.businessKey;

    console.log("Variables: \n");
    console.log("Supplier Name: " + supplierName + "\n");
    console.log("Supplier Info: " + supplierInfo + "\n");
    console.log("Ticket Opening Date: " + ticketOpeningDate + "\n");
    console.log("App1: " + app1 + "\n");
    console.log("App2: " + app2 + "\n");
    console.log("App3: " + app3 + "\n");
    console.log("App4: " + app4 + "\n");
    console.log("Business Key: " + businessKey + "\n");

    const correlationMessageDto: CorrelationMessageDto = {
      messageName: "new-ticket-message-new-supplier",
      businessKey: businessKey,
      processVariables: {
        supplierName: { value: supplierName, type: "String" },
        supplierInfo: { value: supplierInfo, type: "String" },
        ticketOpeningDate: { value: ticketOpeningDate, type: "String" },
        app1: { value: app1, type: "Boolean" },
        app2: { value: app2, type: "Boolean" },
        app3: { value: app3, type: "Boolean" },
        app4: { value: app4, type: "Boolean" },
      },
    };
    await messageController.sendMessage(correlationMessageDto);
    console.log("\nMessage Sent!\n");
    
    await taskService.complete(task, newProcessVariables);
    console.log("\n------------SEND INFO TERMINATED------------\n\n");
    client.stop();
  });
}
