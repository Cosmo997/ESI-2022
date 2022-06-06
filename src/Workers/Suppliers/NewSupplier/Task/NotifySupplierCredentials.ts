import { Task, TaskService } from "camunda-external-task-client-js";
import { IExternalTask } from "../../../../IExternalTask";

export class NotifySupplierCredentialExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ SEND SUPPLIER CREDENTIAL ------------\n");

    console.log("\nUSERNAME: " + task.variables.get("supp-user"));
    console.log("\nPASSWORD: " + task.variables.get("supp-pass"));

    await taskService.complete(task);

    console.log("\n------------SEND SUPPLIER CREDENTIAL ------------\n\n");
  }
}
