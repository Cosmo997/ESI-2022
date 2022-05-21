import { Task, TaskService } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../APIController/message_controller";
import { IExternalTask } from "../../../IExternalTask";
import { Collaborator } from "../../../Model/Collaborator";
import {
  generateCorrelationMessageDTO,
  sendMessage,
} from "./../HelpDeskHelper";

export class UpdateTicketExternalTask implements IExternalTask {
  messageController: MessageController;
  constructor(messageController: MessageController) {
    this.messageController = messageController;
  }
  // TODO: Inviare solo ticket? Fare Update su DB?
  async execute(task: Task, taskService: TaskService): Promise<void> {
    // do someting...
    await taskService.complete(task);
  }
}
