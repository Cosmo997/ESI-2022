import { Task, TaskService } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../APIController/message_controller";
import { IExternalTask } from "../../../IExternalTask";
import { Collaborator } from "../../../Model/Collaborator";
import { sendMessage } from "../HelpDeskHelper";

export class NotifyTicketExternalTask implements IExternalTask {
  messageController: MessageController;
  messageName: string;
  constructor(messageController: MessageController, messageName: string) {
    this.messageController = messageController;
    this.messageName = messageName;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFYING TICKET ------------\n");
    const correlationMessageDto: CorrelationMessageDto = {
      messageName: this.messageName,
      businessKey: task.businessKey,
      processVariables: {
        ticket: {
          value: task.variables.get("ticket"),
        },
      },
    };
    await taskService.complete(task);
    await sendMessage(this.messageController, correlationMessageDto);
    console.log("\n\n------------ NOTIFYING TICKET TERMINATED ------------\n");
  }
}
