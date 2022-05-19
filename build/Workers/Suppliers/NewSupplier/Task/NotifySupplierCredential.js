"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToOpenTicketForNewSupplier = void 0;
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
async function subToOpenTicketForNewSupplier() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    client.subscribe("open-ticket-new-supplier", async function ({ task, taskService }) {
        console.log("\n\n------------ OPEN TICKET AND SEND INFO ------------\n");
        const username = task.variables.get("supp-username");
        const password = task.variables.get("supp-password");
        console.log("Variables: \n");
        console.log("Username: " + username + "\n");
        console.log("Password: " + password + "\n");
        console.log("\nMessage Sent!\n");
        await taskService.complete(task);
        console.log("\n------------SEND INFO TERMINATED------------\n\n");
        client.stop();
    });
}
exports.subToOpenTicketForNewSupplier = subToOpenTicketForNewSupplier;
