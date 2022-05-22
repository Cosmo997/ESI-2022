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

export class OpenTicketExternalTask implements IExternalTask {
  messageController: MessageController;
  messageName: string;
  constructor(messageController: MessageController, messageName: string) {
    this.messageController = messageController;
    this.messageName = messageName;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ OPENING TICKET ------------\n");
    var ticket: Ticket = {
      id: v4(),
      description: JSON.parse(task.variables.get("collaboratorInfo")),
      status: "opened",
      openingDate: new Date(),
      closingDate: undefined,
    };

    console.log("Ticket Opened: " + JSON.stringify(ticket));
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
    console.log("\n\n------------ OPENING TICKET TERMINATED ------------\n");
  }
}
