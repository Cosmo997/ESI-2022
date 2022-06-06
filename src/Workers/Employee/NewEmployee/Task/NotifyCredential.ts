import { IExternalTask } from "../../../../IExternalTask";
import { Task, TaskService } from "camunda-external-task-client-js";

export class NotifyCredentialExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ SEND EMAIL CREDENTIAL START ------------\n");

    console.log("CREDENTIAL:\n");
    console.log("EMAIL: " + task.variables.get("employee-email"));
    console.log("\nPASSWORD: " + task.variables.get("employee-password"));

    await taskService.complete(task);

    console.log("\n------------SEND EMAIL CREDENTIAL FINISH ------------\n\n");
  }
}
