"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToOpenTicketNewCustomer = void 0;
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
const extension_1 = require("../../../../Helpers/extension");
/**
 * Prendere le variabili email, nome, cognome, company e ruoli ed inviarle
 */
async function subToOpenTicketNewCustomer() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("open-ticket-task-new-customer", async function ({ task, taskService }) {
        console.log("\n\n------------ OPEN TICKET NEW CUSTOMER AND SEND INFO ------------\n");
        const currentDate = new Date();
        const newProcessVariables = new camunda_external_task_client_js_1.Variables().set("ticket-opening-date", currentDate);
        const json = JSON.parse(JSON.stringify(task.variables.getAll()));
        let map = new Map();
        for (var value in json) {
            map.set(value, json[value]);
        }
        const ticketOpeningDate = newProcessVariables.get("ticket-opening-date");
        const businessKey = task.businessKey;
        console.log("Ticket Opening Date: " + ticketOpeningDate + "\n");
        console.log("Business Key: " + businessKey + "\n");
        console.log("Ticket Variables: \n");
        for (let [key, value] of map) {
            if (value != undefined) {
                console.log(`${(0, extension_1.titleCaseWord)(key)} :`, value);
            }
        }
        let processVariables = {};
        for (let [key, value] of map) {
            processVariables[key] = { value: value, type: (0, extension_1.titleCaseWord)(typeof value) };
        }
        const correlationMessageDto = {
            messageName: "new-ticket-received-message-new-customer",
            businessKey: businessKey,
            processVariables: processVariables,
        };
        await taskService.complete(task, newProcessVariables);
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------SEND INFO TERMINATED------------\n\n");
        client.stop();
    });
}
exports.subToOpenTicketNewCustomer = subToOpenTicketNewCustomer;
