import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../../CommunicationManager";
import { IExternalTask } from "../../../../IExternalTask";

export class NotifyCredentialExternalTask implements IExternalTask {
  messageName: string;
  variables: string[];
  constructor(messageName: string, variables: string[]) {
    this.variables = variables;
    this.messageName = messageName;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFY CUSTOMER CREDENTIAL ------------\n");

    const cm = new CommunicationManager();

    await cm.sendMessage(
      cm.generateMessageDTO(
        this.messageName,
        task.businessKey,
        cm.getVariablesFromTask(task, this.variables)
      )
    );

    console.log("\nUSERNAME: " + task.variables.get("customer-user"));
    console.log("\nPASSWORD: " + task.variables.get("customer-pass"));

    await taskService.complete(task);

    console.log("\n------------END NOTIFY CREDENTIAL ------------\n\n");
  }
}
