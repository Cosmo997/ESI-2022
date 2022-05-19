"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToOpenTicketNewCustomer = void 0;
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
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
        const customerEmail = task.variables.get("email_key");
        const customerName = task.variables.get("name_key");
        const customerSurname = task.variables.get("surname_key");
        const customerCompany = task.variables.get("company_key");
        const role1 = task.variables.get("role1");
        const role2 = task.variables.get("role2");
        const role3 = task.variables.get("role3");
        const role4 = task.variables.get("role4");
        const json = JSON.parse(JSON.stringify(task.variables.getAll()));
        let map = new Map();
        for (var value in json) {
            map.set(value, json[value]);
        }
        const ticketOpeningDate = newProcessVariables.get("ticket-opening-date");
        const businessKey = task.businessKey;
        console.log("Variables: \n");
        for (let [key, value] of map) {
            if (value != undefined) {
                console.log(`${key} :`, value);
            }
        }
        console.log("Ticket Opening Date: " + ticketOpeningDate + "\n");
        console.log("Business Key: " + businessKey + "\n");
        let processVariables = {};
        for (let [key, value] of map) {
            processVariables[key] = { value: value, type: titleCaseWord(typeof value) };
        }
        console.log("\n\nProcess Variable:" + JSON.stringify(processVariables) + "\n\n");
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
    function titleCaseWord(word) {
        if (!word)
            return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
}
exports.subToOpenTicketNewCustomer = subToOpenTicketNewCustomer;
