"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyCredential = void 0;
const camunda_config_1 = require("../../../config/camunda-config");
const client_1 = require("../../../client");
/**
 * Prendere credenziali e stamparle
 */
function notifyCredential() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getCLient();
    client.subscribe('notify-credential', async function ({ task, taskService }) {
        console.log("\n\n------------NOTIFY CREDENTIAL START------------\n");
        const utente = task.variables.get('utente');
        const password = task.variables.get('password');
        console.log("Variables: \n");
        console.log('Utente: ' + utente + '\n');
        console.log('Password: ' + password);
        await taskService.complete(task);
        console.log("\n------------NOTIFY CREDENTIAL FINISH------------\n\n");
    });
}
exports.notifyCredential = notifyCredential;
