"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToCloseTicketForNewSupplier = void 0;
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToCloseTicketForNewSupplier() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("close-ticket-new-supplier", async function ({ task, taskService }) {
        console.log("\n\n------------ CLOSE TICKET START ------------\n");
        const ticketId = task.variables.get("ticketID");
        const businessKey = task.businessKey;
        console.log("Variables: \n");
        console.log("Ticket ID: " + ticketId + "\n");
        console.log("Business Key: " + businessKey + "\n");
        const correlationMessageDto = {
            messageName: "close-ticket-new-supplier",
            businessKey: businessKey,
            processVariables: {
                ticketId: { value: ticketId, type: "String" }
            },
        };
        await taskService.complete(task);
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------ CLOSE TICKET END ------------\n\n");
        client.stop();
    });
}
exports.subToCloseTicketForNewSupplier = subToCloseTicketForNewSupplier;
