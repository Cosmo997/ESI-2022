"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskInformationsExternalTask = void 0;
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
class AskInformationsExternalTask {
    messageController;
    constructor(messageController) {
        this.messageController = messageController;
    }
    async execute(task, taskService) {
        console.log("\n\n------------ ASK USER INFORMATIONS ------------\n");
        const collaboratorInfo = {
            name: "Giuseppe",
            surname: "Rossi",
        };
        const businessKey = task.businessKey;
        const correlationMessageDto = {
            messageName: "ask-information-message-new-collaborator",
            businessKey: businessKey,
            processVariables: {
                collaboratorInfo: {
                    value: collaboratorInfo,
                },
            },
        };
        await taskService.complete(task);
        await this.messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
        console.log("\n------------ ASK USER INFORMATIONS TERMINATED ------------\n\n");
    }
}
exports.AskInformationsExternalTask = AskInformationsExternalTask;
