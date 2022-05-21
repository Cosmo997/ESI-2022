"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToSaveTicketForNewSupplier = void 0;
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
const uuid_1 = require("uuid");
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
async function subToSaveTicketForNewSupplier() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    client.subscribe("save-ticket-new-supplier", async function ({ task, taskService }) {
        console.log("\n\n------------ SAVE TICKET  ------------\n");
        const ticketID = (0, uuid_1.v4)();
        const newProcessVariables = new camunda_external_task_client_js_1.Variables()
            .set("ticketID", ticketID);
        console.log("Ticket saved");
        await taskService.complete(task, newProcessVariables);
        console.log("\n------------SAVE TICKET TERMINATED------------\n\n");
        client.stop();
    });
}
exports.subToSaveTicketForNewSupplier = subToSaveTicketForNewSupplier;
