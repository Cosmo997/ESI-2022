"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyCredentialsExternalTask = void 0;
const message_controller_1 = require("../../../../APIController/message_controller");
const HelpDeskHelper_1 = require("../../../HelpDesk/HelpDeskHelper");
class NotifyCredentialsExternalTask {
    messageName;
    variables;
    constructor(messageName, variables) {
        this.messageName = messageName;
        this.variables = variables;
    }
    async execute(task, taskService) {
        console.log("\n\n------------ NOTIFY CREDENTIALS ------------\n");
        const variables = (0, HelpDeskHelper_1.getVariables)(task, this.variables);
        await new message_controller_1.MessageController().sendMessage((0, HelpDeskHelper_1.generateCorrelationMessageDTO)(this.messageName, task.businessKey, variables));
        // Notify New Assignment
        await taskService.complete(task);
        console.log("\n------------ NOTIFY CREDENTIALS TERMINATED------------\n\n");
    }
}
exports.NotifyCredentialsExternalTask = NotifyCredentialsExternalTask;
