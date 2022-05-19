import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi/api";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToNotifyITForNewSupplier() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe(
    "notify-it-developer-new-supplier",
    async function ({ task, taskService }) {
      console.log("\n\n------------ NOTIFY IT DEVELOPER NEW SUPPLIER ------------\n");

    const supplierName = task.variables.get("supplierName");
    const supplierInfo = task.variables.get("supplierInfo");
    const ticketOpeningDate = task.variables.get("ticketOpeningDate");
    const ticketID = task.variables.get("ticketID");
    const app1 = task.variables.get("app1");
    const app2 = task.variables.get("app2");
    const app3 = task.variables.get("app3");
    const app4 = task.variables.get("app4");
    const businessKey = task.businessKey;

    console.log("Variables: \n");
    console.log("Supplier Name: " + supplierName + "\n");
    console.log("Supplier Info: " + supplierInfo + "\n");
    console.log("Ticket Opening Date: " + ticketOpeningDate + "\n");
    console.log("Ticket ID: " + ticketID);
    console.log("App1: " + app1 + "\n");
    console.log("App2: " + app2 + "\n");
    console.log("App3: " + app3 + "\n");
    console.log("App4: " + app4 + "\n");
    console.log("Business Key: " + businessKey + "\n");


      const correlationMessageDto: CorrelationMessageDto = {
        messageName: "notify-it-new-supplier-message",
        businessKey: businessKey,
        processVariables: {
          supplierName: { value: supplierName, type: "String" },
          supplierInfo: { value: supplierInfo, type: "String" },
          ticketOpeningDate: { value: ticketOpeningDate, type: "String" },
          ticketID: {value: ticketID, type: "String"},
          app1: { value: app1, type: "Boolean" },
          app2: { value: app2, type: "Boolean" },
          app3: { value: app3, type: "Boolean" },
          app4: { value: app4, type: "Boolean" },
        },
      };
      await messageController.sendMessage(correlationMessageDto);
      console.log("\nMessage Sent!\n");
      
      await taskService.complete(task);
      console.log("\n------------ NOTIFY IT DEVELOPER NEW SUPPLIER TERMINATED ------------\n\n");
      
      client.stop();
    }
  );
}
