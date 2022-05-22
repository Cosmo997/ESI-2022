"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveCollaboratorInformationsExternalTask = void 0;
class SaveCollaboratorInformationsExternalTask {
    async execute(task, taskService) {
        console.log("\n\n------------ SAVE COLLABORATOR INFORMATIONS ------------\n");
        const collaboratorInfo = task.variables.get("collaboratorInfo");
        console.log(JSON.parse(collaboratorInfo));
        taskService.complete(task);
        console.log("\nCollaborator Information Saved!\n");
        console.log("\n------------ SAVE COLLABORATOR INFORMATIONS TERMINATED------------\n\n");
    }
}
exports.SaveCollaboratorInformationsExternalTask = SaveCollaboratorInformationsExternalTask;
