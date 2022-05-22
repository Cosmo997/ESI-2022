import { Task, TaskService } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../APIController/message_controller";
import { IExternalTask } from "../../../IExternalTask";
import { Collaborator } from "../../../Model/Collaborator";
import { Ticket } from "../../../Model/Ticket";
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
    console.log("\n\n------------ UPDATING TICKET ------------\n");
    var ticket: Ticket = JSON.parse(task.variables.get("ticket"));

    console.log("Ticket Updated: " + ticket);
    // do someting...
    await taskService.complete(task);
    console.log("\n\n------------ UPDATING TICKET TERMINATED ------------\n");
  }
}
