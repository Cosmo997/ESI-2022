import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { v4 } from "uuid";
import { CorrelationMessageDto } from "../../../Utils/api/src/generated-sources/openapi";
import { MessageController } from "../../../Utils/APIController/message_controller";
import { CommunicationManager } from "../../../CommunicationManager";
import { IExternalTask } from "../../../IExternalTask";
import { Ticket } from "../../../Model/Ticket";

export class OpenTicketExternalTask implements IExternalTask {
  messageName: string;
  constructor(messageName: string) {
    this.messageName = messageName;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ OPENING TICKET ------------\n");
    const cm = new CommunicationManager();
    var ticket: Ticket = {
      id: v4(),
      description: JSON.parse(JSON.stringify(task.variables.getAll())),
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
    console.log(
      "\nCorrelationMessageDTO \n" + JSON.stringify(correlationMessageDto)
    );
    await taskService.complete(task);
    await cm.sendMessage(correlationMessageDto);
    console.log("\n\n------------ OPENING TICKET TERMINATED ------------\n");
  }
}
