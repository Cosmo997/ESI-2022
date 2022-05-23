import { Task, TaskService } from "camunda-external-task-client-js";
import { stringify } from "uuid";
import { MessageController } from "../../../../APIController/message_controller";
import { IExternalTask } from "../../../../IExternalTask";
import {
  generateCorrelationMessageDTO,
  getVariables,
} from "../../../HelpDesk/HelpDeskHelper";

export class NotifyCredentialsExternalTask implements IExternalTask {
  messageName: string;
  variables: string[];
  constructor(messageName: string, variables: string[]) {
    this.messageName = messageName;
    this.variables = variables;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFY CREDENTIALS ------------\n");
    const variables = getVariables(task, this.variables);
    await new MessageController().sendMessage(
      generateCorrelationMessageDTO(
        this.messageName,
        task.businessKey,
        variables
      )
    );
    // Notify New Assignment

    await taskService.complete(task);

    console.log("\n------------ NOTIFY CREDENTIALS TERMINATED------------\n\n");
  }
}
