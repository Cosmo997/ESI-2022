"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToAskInformations = void 0;
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToAskInformations() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("ask-information", async function ({ task, taskService }) {
        console.log("\n\n------------ ASK USER INFORMATIONS ------------\n");
        const collaboratorInfo = {
            name: "Giuseppe",
            surname: "Rossi",
        };
        const businessKey = task.businessKey;
        const correlationMessageDto = {
            messageName: "ask-information-message",
            businessKey: businessKey,
            processVariables: {
                collaboratorInfo: {
                    value: { name: "Giuseppe", surname: "Rossi" },
                },
            },
        };
        await taskService.complete(task);
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------ ASK USER INFORMATIONS TERMINATED ------------\n\n");
        //client.stop();
    });
}
exports.subToAskInformations = subToAskInformations;
