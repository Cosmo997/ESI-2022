import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../APIController/message_controller";
import { IExternalTask } from "../../../IExternalTask";
import { Collaborator } from "../../../Model/Collaborator";
import { Ticket } from "../../../Model/Ticket";
import { generateCorrelationMessageDTO, sendMessage } from "../HelpDeskHelper";

export class CloseTicketExternalTask implements IExternalTask {
  messageController: MessageController;
  messageName: string;
  constructor(messageController: MessageController, messageName: string) {
    this.messageController = messageController;
    this.messageName = messageName;
  }
  // TODO: Inviare solo ticket? Chiudere ticket su DB?
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ CLOSING TICKET ------------\n");
    var ticket: Ticket = JSON.parse(task.variables.get("ticket"));

    ticket.closingDate = new Date();
    ticket.status = "closed";

    // TODO Close ticket on db

    console.log("Ticket Closed: " + JSON.stringify(ticket));
    const correlationMessageDto: CorrelationMessageDto = {
      messageName: this.messageName,
      businessKey: task.businessKey,
      processVariables: {
        ticket: {
          value: ticket,
        },
      },
    };

    await sendMessage(this.messageController, correlationMessageDto);
    await taskService.complete(task);
    console.log("\n\n------------ CLOSING TICKET TERMINATED ------------\n");
  }
}
