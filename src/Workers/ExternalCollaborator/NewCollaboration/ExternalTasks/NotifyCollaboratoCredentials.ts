import { Task, TaskService } from "camunda-external-task-client-js";
import { IExternalTask } from "../../../../IExternalTask";

export class NotifyCollaboratorCredentialsExternalTask
  implements IExternalTask
{
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFY CREDENTIALS ------------\n");


    console.log("USERNAME: " + task.variables.get("COLLAB_USERNAME"));
    console.log("PASSWORD: " + task.variables.get("COLLAB_PASSWORD"));
    await taskService.complete(task);

    console.log("\n------------ NOTIFY CREDENTIALS TERMINATED------------\n\n");
  }
}
