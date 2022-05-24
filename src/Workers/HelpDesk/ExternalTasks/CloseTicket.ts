import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../APIController/message_controller";
import { CommunicationManager } from "../../../CommunicationManager";
import { IExternalTask } from "../../../IExternalTask";
import { Collaborator } from "../../../Model/Collaborator";
import { Ticket } from "../../../Model/Ticket";

export class CloseTicketExternalTask implements IExternalTask {
  messageName: string;
  constructor(messageName: string) {
    this.messageName = messageName;
  }
  // TODO: Inviare solo ticket? Chiudere ticket su DB?

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ CLOSING TICKET ------------\n");
    var ticket: Ticket = JSON.parse(await task.variables.get("ticket"));
    const cm = new CommunicationManager();

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

    await taskService.complete(task);

    await cm.sendMessage(correlationMessageDto);
    console.log("\n\n------------ CLOSING TICKET TERMINATED ------------\n");
  }
}
