"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToUpdateTicketForNewSupplier = void 0;
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
async function subToUpdateTicketForNewSupplier() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    client.subscribe("update-ticket-new-supplier", async function ({ task, taskService }) {
        console.log("\n\n------------ UPDATE TICKET  ------------\n");
        console.log("Ticket updated");
        await taskService.complete(task);
        console.log("\n------------UPDATE TICKET TERMINATED------------\n\n");
        client.stop();
    });
}
exports.subToUpdateTicketForNewSupplier = subToUpdateTicketForNewSupplier;
