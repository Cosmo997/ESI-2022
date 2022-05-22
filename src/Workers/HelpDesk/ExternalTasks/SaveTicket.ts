import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { v4 } from "uuid";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../APIController/message_controller";
import { IExternalTask } from "../../../IExternalTask";
import { Collaborator } from "../../../Model/Collaborator";
import { Ticket } from "../../../Model/Ticket";
import {
  generateCorrelationMessageDTO,
  sendMessage,
} from "./../HelpDeskHelper";

export class SaveTicketExternalTask implements IExternalTask {
  messageController: MessageController;
  constructor(messageController: MessageController) {
    this.messageController = messageController;
  }
  // TODO: Inviare solo ticket?
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ SAVING TICKET ------------\n");
    var ticket: Ticket = JSON.parse(await task.variables.get("ticket"));
    console.log(ticket);
    ticket.status = "received";
    const newProcessVariables = new Variables().set("ticket", ticket);

    // Put here save logic...

    console.log("Ticket Saved: " + JSON.stringify(ticket));
    await taskService.complete(task, newProcessVariables);

    console.log(
      `\n------------SAVE TICKET OPERATION TERMINATED \nTASK ID: ${task.id} ------------\n\n`
    );
  }
}