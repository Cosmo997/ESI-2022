"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifySupplierCredentialExternalTask = void 0;
const CommunicationManager_1 = require("../../../../CommunicationManager");
class NotifySupplierCredentialExternalTask {
    variables;
    constructor(variables) {
        this.variables = variables;
    }
    async execute(task, taskService) {
        console.log("\n\n------------ SEND SUPPLIER CREDENTIAL ------------\n");
        const cm = new CommunicationManager_1.CommunicationManager();
        const variables = cm.getVariables(task, this.variables);
        const email = task.variables.get("email");
        // TODO: Send email Email?
        // sendEmai(email, variables);
        await taskService.complete(task);
        console.log("\n------------SEND SUPPLIER CREDENTIAL ------------\n\n");
    }
}
exports.NotifySupplierCredentialExternalTask = NotifySupplierCredentialExternalTask;
