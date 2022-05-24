import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../../CommunicationManager";
import { IExternalTask } from "../../../../IExternalTask";

export class NotifySupplierCredentialExternalTask implements IExternalTask {
  variables: string[];
  constructor(variables: string[]) {
    this.variables = variables;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ SEND SUPPLIER CREDENTIAL ------------\n");

    const cm = new CommunicationManager();
    const variables = cm.getVariables(task, this.variables);
    const email = task.variables.get("email");

    // TODO: Send email Email?
    // sendEmai(email, variables);

    await taskService.complete(task);

    console.log("\n------------SEND SUPPLIER CREDENTIAL ------------\n\n");
  }
}
