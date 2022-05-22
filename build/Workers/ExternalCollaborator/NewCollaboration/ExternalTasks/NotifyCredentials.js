"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyCredentialsExternalTask = void 0;
class NotifyCredentialsExternalTask {
    async execute(task, taskService) {
        console.log("\n\n------------ NOTIFY CREDENTIALS ------------\n");
        // Notify New Assignment
        // TODO: Email?
        await taskService.complete(task);
        console.log("\n------------ NOTIFY CREDENTIALS TERMINATED------------\n\n");
    }
}
exports.NotifyCredentialsExternalTask = NotifyCredentialsExternalTask;
