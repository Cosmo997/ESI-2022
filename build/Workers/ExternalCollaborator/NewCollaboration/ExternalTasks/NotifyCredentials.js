"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToNotifyCredentials = void 0;
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
async function subToNotifyCredentials() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    client.subscribe("notify-credentials", async function ({ task, taskService }) {
        console.log("\n\n------------ NOTIFY CREDENTIALS ------------\n");
        const employeeID = task.variables.get("employee-id");
        const transferDetails = task.variables.get("transfer-details");
        const ticketId = task.variables.get("ticket-id");
        const ticketOpeningDate = task.variables.get("ticket-opening-date");
        const ticketClosingDate = task.variables.get("ticket-closing-date");
        const businessKey = task.businessKey;
        // Notify New Assignment
        // TODO: Email?
        await taskService.complete(task);
        console.log("\n------------ NOTIFY CREDENTIALS TERMINATED------------\n\n");
        //client.stop();
    });
}
exports.subToNotifyCredentials = subToNotifyCredentials;
