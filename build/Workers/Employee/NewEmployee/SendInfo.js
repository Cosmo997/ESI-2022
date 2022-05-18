"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToSendNewEmployeeInformationServiceTask = void 0;
const client_1 = require("../../../client");
const camunda_config_1 = require("../../../config/camunda-config");
const message_controller_1 = require("../../../APIController/message_controller");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToSendNewEmployeeInformationServiceTask() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("send-info", async function ({ task, taskService }) {
        console.log("\n\n------------SEND INFO------------\n");
        const email = task.variables.get("email");
        const nome = task.variables.get("nome");
        const cognome = task.variables.get("cognome");
        const id = task.variables.get("ID");
        const businessKey = task.businessKey;
        console.log("Variables: \n");
        console.log("Email: " + email + "\n");
        console.log("Nome: " + nome + "\n");
        console.log("Cognome: " + cognome + "\n");
        console.log("Id: " + id + "\n");
        console.log("Business Key: " + businessKey + "\n");
        const correlationMessageDto = {
            messageName: "info",
            businessKey: businessKey,
            processVariables: {
                email: { value: email, type: "String" },
                nome: { value: nome, type: "String" },
                cognome: { value: cognome, type: "String" },
                ID: { value: id, type: "String" },
            },
        };
        await taskService.complete(task);
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------SEND INFO FINISH------------\n\n");
        client.stop();
    });
}
exports.subToSendNewEmployeeInformationServiceTask = subToSendNewEmployeeInformationServiceTask;
