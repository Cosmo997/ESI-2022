import { Task, TaskService } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../Utils/api/src/generated-sources/openapi";
import { MessageController } from "../../../Utils/APIController/message_controller";
import { CommunicationManager } from "../../../CommunicationManager";
import { IExternalTask } from "../../../IExternalTask";

export class NotifyTicketExternalTask implements IExternalTask {
  messageName: string;
  constructor(messageName: string) {
    this.messageName = messageName;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFYING TICKET ------------\n");
    const cm = new CommunicationManager();
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
    await cm.sendMessage(correlationMessageDto);
    console.log("\n\n------------ NOTIFYING TICKET TERMINATED ------------\n");
  }
}
