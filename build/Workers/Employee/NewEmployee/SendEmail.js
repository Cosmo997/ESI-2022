"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToSendEmail = void 0;
const client_1 = require("../../../client");
const camunda_config_1 = require("../../../config/camunda-config");
const message_controller_1 = require("../../../APIController/message_controller");
/**
 * Prendere le variabili email, nome, cognome, id e needed-information ed inviarle
 */
function subToSendEmail() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("send-email", async function ({ task, taskService }) {
        console.log("\n\n------------SEND EMAIL START------------\n");
        const email = task.variables.get("email");
        const nome = task.variables.get("nome");
        const cognome = task.variables.get("cognome");
        const id = task.variables.get("ID");
        const neededInfo = task.variables.get("needed-info");
        const businessKey = task.businessKey;
        console.log("Variables: \n");
        console.log("Email: " + email + "\n");
        console.log("Nome: " + nome + "\n");
        console.log("Cognome: " + cognome + "\n");
        console.log("Id: " + id + "\n");
        console.log("Needed Info: " + neededInfo + "\n");
        console.log("Business Key: " + businessKey + "\n");
        await taskService.complete(task);
        const correlationMessageDto = {
            messageName: "email",
            businessKey: businessKey,
            processVariables: {
                email: { value: email, type: "String" },
                nome: { value: nome, type: "String" },
                cognome: { value: cognome, type: "String" },
                ID: { value: id, type: "String" },
                neededInfo: { value: neededInfo, type: "String" },
            },
        };
        await messageController.sendMessage(correlationMessageDto);
        console.log("\n------------SEND EMAIL FINISH-----------\n\n");
        client.stop();
    });
}
exports.subToSendEmail = subToSendEmail;
