import { Task, TaskService } from "camunda-external-task-client-js";
import { stringify } from "uuid";
import { MessageController } from "../../../../APIController/message_controller";
import { CommunicationManager } from "../../../../CommunicationManager";
import { IExternalTask } from "../../../../IExternalTask";

export class NotifyCredentialsExternalTask implements IExternalTask {
  messageName: string;
  variables: string[];
  constructor(messageName: string, variables: string[]) {
    this.messageName = messageName;
    this.variables = variables;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFY CREDENTIALS ------------\n");

    const cm = new CommunicationManager();

    const variables = cm.getVariables(task, this.variables);

    await cm.sendMessage(
      cm.generateMessageDTO(this.messageName, task.businessKey, variables)
    );
    // Notify New Assignment

    await taskService.complete(task);

    console.log("\n------------ NOTIFY CREDENTIALS TERMINATED------------\n\n");
  }
}
