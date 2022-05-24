"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyCredentialsExternalTask = void 0;
const CommunicationManager_1 = require("../../../../CommunicationManager");
class NotifyCredentialsExternalTask {
    messageName;
    variables;
    constructor(messageName, variables) {
        this.messageName = messageName;
        this.variables = variables;
    }
    async execute(task, taskService) {
        console.log("\n\n------------ NOTIFY CREDENTIALS ------------\n");
        const cm = new CommunicationManager_1.CommunicationManager();
        const variables = cm.getVariables(task, this.variables);
        await cm.sendMessage(cm.generateMessageDTO(this.messageName, task.businessKey, variables));
        // Notify New Assignment
        await taskService.complete(task);
        console.log("\n------------ NOTIFY CREDENTIALS TERMINATED------------\n\n");
    }
}
exports.NotifyCredentialsExternalTask = NotifyCredentialsExternalTask;
