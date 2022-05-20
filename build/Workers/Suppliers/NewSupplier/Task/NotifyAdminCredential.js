"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToNotifyCredentialToAdminForNewSupplier = void 0;
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
async function subToNotifyCredentialToAdminForNewSupplier() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("notify-admin-new-supplier", async function ({ task, taskService }) {
        console.log("\n\n------------ NOTIFY ADMIN CREDENTIAL ------------\n");
        const username = task.variables.get("supp-username");
        const password = task.variables.get("supp-password");
        const businessKey = task.businessKey;
        console.log("Variables: \n");
        console.log("Username: " + username + "\n");
        console.log("Password: " + password + "\n");
        console.log("Business Key: " + businessKey + "\n");
        const correlationMessageDto = {
            messageName: "notify-admin-credential-new-supplier",
            businessKey: businessKey,
            processVariables: {
                username: { value: username, type: "String" },
                password: { value: password, type: "String" },
            },
        };
        await taskService.complete(task);
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------ NOTIFY ADMIN CREDENTIAL TERMINATED------------\n\n");
        client.stop();
    });
}
exports.subToNotifyCredentialToAdminForNewSupplier = subToNotifyCredentialToAdminForNewSupplier;
