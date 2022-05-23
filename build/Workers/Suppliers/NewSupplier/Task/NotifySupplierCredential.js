"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifySupplierCredentialExternalTask = void 0;
const HelpDeskHelper_1 = require("../../../HelpDesk/HelpDeskHelper");
class NotifySupplierCredentialExternalTask {
    variables;
    constructor(variables) {
        this.variables = variables;
    }
    async execute(task, taskService) {
        console.log("\n\n------------ SEND SUPPLIER CREDENTIAL ------------\n");
        const variables = (0, HelpDeskHelper_1.getVariables)(task, this.variables);
        const email = task.variables.get('email');
        // TODO: Send email Email?
        // sendEmai(email, variables);
        await taskService.complete(task);
        console.log("\n------------SEND SUPPLIER CREDENTIAL ------------\n\n");
    }
}
exports.NotifySupplierCredentialExternalTask = NotifySupplierCredentialExternalTask;
