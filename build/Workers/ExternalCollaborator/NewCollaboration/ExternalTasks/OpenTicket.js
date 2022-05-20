"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToOpenTicket = void 0;
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToOpenTicket() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("open-ticket", async function ({ task, taskService }) {
        console.log("\n\n------------ OPEN TICKET AND SEND INFO ------------\n");
        const currentDate = new Date();
        const newProcessVariables = new camunda_external_task_client_js_1.Variables().set("ticket-opening-date", currentDate);
        const employeeID = task.variables.get("employee-id");
        const transferDetails = task.variables.get("transfer-details");
        const businessKey = task.businessKey;
        const correlationMessageDto = {
            messageName: "open-ticket-message",
            businessKey: businessKey,
            processVariables: {
                employeeID: { value: employeeID, type: "String" },
                transferDetails: { value: transferDetails, type: "String" },
            },
        };
        await taskService.complete(task, newProcessVariables);
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------SEND INFO TERMINATED------------\n\n");
        //client.stop();
    });
}
exports.subToOpenTicket = subToOpenTicket;
