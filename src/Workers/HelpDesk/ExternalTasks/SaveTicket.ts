import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { v4 } from "uuid";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../APIController/message_controller";
import { IExternalTask } from "../../../IExternalTask";
import { Collaborator } from "../../../Model/Collaborator";
import {
  generateCorrelationMessageDTO,
  sendMessage,
} from "./../HelpDeskHelper";

export class SaveTicketExternalTask implements IExternalTask {
  messageController: MessageController;
  constructor(messageController: MessageController) {
    this.messageController = messageController;
  }
  // TODO: Inviare solo ticket? Chiudere ticket su DB?
  async execute(task: Task, taskService: TaskService): Promise<void> {
    // TODO (Vedere se funzia ugualmente)
    // task.variables.setAll({ "ticket-save-date": new Date(), ticketId: v4() });
    const newProcessVariables = new Variables().setAll({
      "ticket-save-date": new Date(),
      ticketId: v4(),
    });

    // Put here save logic...

    await taskService.complete(task, newProcessVariables);

    console.log(
      `\n------------SAVE TICKET OPERATION TERMINATED \nTASK ID: ${task.id} ------------\n\n`
    );
  }
}
