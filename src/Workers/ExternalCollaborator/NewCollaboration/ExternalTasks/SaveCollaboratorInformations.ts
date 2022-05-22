import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { IExternalTask } from "../../../../IExternalTask";

export class SaveCollaboratorInformationsExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log(
      "\n\n------------ SAVE COLLABORATOR INFORMATIONS ------------\n"
    );

    const collaboratorInfo = task.variables.get("collaboratorInfo");
    console.log(JSON.parse(collaboratorInfo));
    taskService.complete(task);
    console.log("\nCollaborator Information Saved!\n");

    console.log(
      "\n------------ SAVE COLLABORATOR INFORMATIONS TERMINATED------------\n\n"
    );
  }
}
