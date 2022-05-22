"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToNotifyItDev = void 0;
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToNotifyItDev() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("notify-it-developer", async function ({ task, taskService }) {
        console.log("\n\n------------ NOTIFY IT DEVELOPER ------------\n");
        const employeeID = task.variables.get("employee-id");
        const transferDetails = task.variables.get("transfer-details");
        const ticketId = task.variables.get("ticket-id");
        const ticketOpeningDate = task.variables.get("ticket-opening-date");
        const businessKey = task.businessKey;
        const correlationMessageDto = {
            messageName: "notify-it-message",
            businessKey: businessKey,
            processVariables: {
                employeeID: { value: employeeID, type: "String" },
                transferDetails: { value: transferDetails, type: "String" },
                ticketId: { value: ticketId, type: "String" },
                ticketOpeningDate: { value: ticketOpeningDate, type: "String" },
            },
        };
        await taskService.complete(task);
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------SEND INFO TERMINATED------------\n\n");
        //client.stop();
    });
}
exports.subToNotifyItDev = subToNotifyItDev;