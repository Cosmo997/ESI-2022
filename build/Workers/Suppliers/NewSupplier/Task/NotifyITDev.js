"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToNotifyITForNewSupplier = void 0;
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToNotifyITForNewSupplier() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("notify-it-developer-new-supplier", async function ({ task, taskService }) {
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
        const correlationMessageDto = {
            messageName: "notify-it-new-supplier-message",
            businessKey: businessKey,
            processVariables: {
                supplierName: { value: supplierName, type: "String" },
                supplierInfo: { value: supplierInfo, type: "String" },
                ticketOpeningDate: { value: ticketOpeningDate, type: "String" },
                ticketID: { value: ticketID, type: "String" },
                app1: { value: app1, type: "Boolean" },
                app2: { value: app2, type: "Boolean" },
                app3: { value: app3, type: "Boolean" },
                app4: { value: app4, type: "Boolean" },
            },
        };
        await taskService.complete(task);
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------ NOTIFY IT DEVELOPER NEW SUPPLIER TERMINATED ------------\n\n");
        client.stop();
    });
}
exports.subToNotifyITForNewSupplier = subToNotifyITForNewSupplier;
