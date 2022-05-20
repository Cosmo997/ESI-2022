"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToCloseTicket = void 0;
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToCloseTicket() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("close-ticket", async function ({ task, taskService }) {
        console.log("\n\n------------ CLOSE TICKET AND SEND INFO ------------\n");
        const currentDate = new Date();
        const newProcessVariables = new camunda_external_task_client_js_1.Variables()
            .set("ticket-closing-date", currentDate)
            .set("ticket-status", "ok");
        const employeeID = task.variables.get("employee-id");
        const transferDetails = task.variables.get("transfer-details");
        const ticketId = task.variables.get("ticket-id");
        const ticketOpeningDate = task.variables.get("ticket-opening-date");
        const ticketClosingDate = newProcessVariables.get("ticket-closing-date");
        const businessKey = task.businessKey;
        const correlationMessageDto = {
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
exports.subToCloseTicket = subToCloseTicket;
