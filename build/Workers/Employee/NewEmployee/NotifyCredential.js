"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToNotifyCredential = void 0;
const camunda_config_1 = require("../../../config/camunda-config");
const client_1 = require("../../../client");
/**
 * Prendere credenziali e stamparle
 */
async function subToNotifyCredential() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    client.subscribe("notify-credential", async function ({ task, taskService }) {
        console.log("\n\n------------NOTIFY CREDENTIAL START------------\n");
        const email = task.variables.get("email");
        const nome = task.variables.get("nome");
        const cognome = task.variables.get("cognome");
        const id = task.variables.get("ID");
        const neededInfo = task.variables.get("needed-info");
        const businessKey = task.businessKey;
        console.log("\nEmail sended to " + email + ".");
        const utente = task.variables.get("utente");
        const password = task.variables.get("password");
        console.log("Credentials: \n");
        console.log("Utente: " + utente + "\n");
        console.log("Password: " + password);
        await taskService.complete(task);
        console.log("\n------------NOTIFY CREDENTIAL FINISH------------\n\n");
        client.stop();
    });
}
exports.subToNotifyCredential = subToNotifyCredential;
