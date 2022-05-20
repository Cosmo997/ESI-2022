"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToNotifyTicketOwner = void 0;
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToNotifyTicketOwner() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("notify-ticket-owner-new-supplier", async function ({ task, taskService }) {
        console.log("\n\n------------ NOTIFY TICKET OWNER NEW SUPPLIER START ------------\n");
        const ticketId = task.variables.get("ticket-id");
        const businessKey = task.businessKey;
        console.log("Variables: \n");
        console.log("Ticket ID: " + ticketId + "\n");
        console.log("Business Key: " + businessKey + "\n");
        const correlationMessageDto = {
            messageName: "notify-ticket-owner-message-new-supplier",
            businessKey: businessKey,
            processVariables: {
                ticketId: { value: ticketId, type: "String" },
            },
        };
        await taskService.complete(task);
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------ NOTIFY TICKET OWNER NEW SUPPLIER TERMINATED ------------\n\n");
        client.stop();
    });
}
exports.subToNotifyTicketOwner = subToNotifyTicketOwner;
