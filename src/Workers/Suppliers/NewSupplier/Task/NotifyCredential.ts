import { Task, TaskService } from "camunda-external-task-client-js";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";
import { IExternalTask } from "../../../../IExternalTask";
import {
  generateCorrelationMessageDTO,
  getVariables,
} from "../../../HelpDesk/HelpDeskHelper";

export class NotifyCredentialExternalTask implements IExternalTask {
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

    await new MessageController().sendMessage(
      generateCorrelationMessageDTO(
        this.messageName,
        task.businessKey,
        getVariables(task, this.variables)
      )
    );

    await taskService.complete(task);
    console.log("\n------------END SEND CREDENTIAL TO ADMIN------------\n\n");
  }
}
