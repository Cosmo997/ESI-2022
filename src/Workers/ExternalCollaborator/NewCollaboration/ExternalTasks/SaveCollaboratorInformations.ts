import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { IExternalTask } from "../../../../IExternalTask";

export class SaveCollaboratorInformationsExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log(
      "\n\n------------ SAVE COLLABORATOR INFORMATIONS ------------\n"
    );

    const collaboratorInfo = task.variables.get("collaboratorInfo");
    console.log(collaboratorInfo);
    taskService.complete(task);
    console.log("\nEnd Date Calculated!\n");

    console.log(
      "\n------------ SAVE COLLABORATOR INFORMATIONS TERMINATED------------\n\n"
    );
  }
}
