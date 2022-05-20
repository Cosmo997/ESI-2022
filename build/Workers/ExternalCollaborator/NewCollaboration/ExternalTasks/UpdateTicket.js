"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToUpdateTicket = void 0;
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToUpdateTicket() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("update-ticket", async function ({ task, taskService }) {
        console.log("\n\n------------ UPDATE TICKET AND SEND INFO ------------\n");
        taskService.complete(task);
        console.log("\nTicket Updated!\n");
        console.log("\n------------ UPDATE TICKET TERMINATED------------\n\n");
        //client.stop();
    });
}
exports.subToUpdateTicket = subToUpdateTicket;
