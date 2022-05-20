"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToSaveTicket = void 0;
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
const uuid_1 = require("uuid");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToSaveTicket() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("save-ticket", async function ({ task, taskService }) {
        console.log("\n\n------------ SAVE TICKET AND SEND INFO ------------\n");
        const ticketId = (0, uuid_1.v4)();
        const newProcessVariables = new camunda_external_task_client_js_1.Variables().set("ticket-id", ticketId);
        taskService.complete(task, newProcessVariables);
        console.log("\nTicket Saved!\n");
        console.log("\n------------SAVE TICKET TERMINATED------------\n\n");
        //client.stop();
    });
}
exports.subToSaveTicket = subToSaveTicket;
