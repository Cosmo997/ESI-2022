import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../../CommunicationManager";
import { IExternalTask } from "../../../../IExternalTask";

export class NotifyAdminCredentialExternalTask implements IExternalTask {
  messageName: string;
  variables: string[];
  constructor(messageName: string, variables: string[]) {
    this.variables = variables;
    this.messageName = messageName;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log(
      "\n\n------------ SEND SUPPLIER CREDENTIAL TO ADMIN ------------\n"
    );

    const cm = new CommunicationManager();

    await cm.sendMessage(
      cm.generateMessageDTO(
        this.messageName,
        task.businessKey,
        cm.getVariables(task.variables, this.variables)
      )
    );

    await taskService.complete(task);

    console.log("\n------------END SEND CREDENTIAL TO ADMIN------------\n\n");
  }
}
