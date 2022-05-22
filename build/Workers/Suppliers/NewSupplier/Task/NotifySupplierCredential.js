"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToNotifySupplierCredentialForNewSupplier = void 0;
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
async function subToNotifySupplierCredentialForNewSupplier() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    client.subscribe("notify-supplier-credential", async function ({ task, taskService }) {
        console.log("\n\n------------ OPEN TICKET AND SEND INFO ------------\n");
        const username = task.variables.get("supp-user");
        const password = task.variables.get("supp-pass");
        console.log("Variables: \n");
        console.log("Username: " + username + "\n");
        console.log("Password: " + password + "\n");
        console.log("\nMessage Sent!\n");
        await taskService.complete(task);
        console.log("\n------------SEND INFO TERMINATED------------\n\n");
        client.stop();
    });
}
exports.subToNotifySupplierCredentialForNewSupplier = subToNotifySupplierCredentialForNewSupplier;