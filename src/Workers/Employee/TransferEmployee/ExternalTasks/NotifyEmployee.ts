import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../../CommunicationManager";
import { IExternalTask } from "../../../../IExternalTask";

export class NotifyEmployeeExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFY EMPLOYEE ------------\n");

    const transferDetails = task.variables.get("transfer-details");
    console.log("Transfer Details: " + transferDetails + "\n");

    await taskService.complete(task);

    console.log("\n------------END NOTIFY EMPLOYEE ------------\n\n");
  }
}
