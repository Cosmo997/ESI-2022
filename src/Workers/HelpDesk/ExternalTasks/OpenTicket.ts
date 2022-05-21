import { Task, TaskService } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../APIController/message_controller";
import { IExternalTask } from "../../../IExternalTask";
import { Collaborator } from "../../../Model/Collaborator";
import {
  generateCorrelationMessageDTO,
  sendMessage,
} from "./../HelpDeskHelper";

export class OpenTicketExternalTask implements IExternalTask {
  messageController: MessageController;
  messageName: string;
  constructor(messageController: MessageController, messageName: string) {
    this.messageController = messageController;
    this.messageName = messageName;
  }
  // TODO: Inviare solo ticket?
  async execute(task: Task, taskService: TaskService): Promise<void> {
    const correlationMessageDto: CorrelationMessageDto =
      generateCorrelationMessageDTO(
        this.messageName,
        task.businessKey,
        task.variables.getAll()
      );
    await sendMessage(this.messageController, correlationMessageDto);
    await taskService.complete(task);
  }
}
