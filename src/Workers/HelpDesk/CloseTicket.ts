import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../Utils/api/src/generated-sources/openapi";
import { MessageController } from "../../Utils/APIController/message_controller";
import { CommunicationManager } from "../../CommunicationManager";
import { IExternalTask } from "../../IExternalTask";
import { Collaborator } from "../../Model/Collaborator";
import { Ticket } from "../../Model/Ticket";

export class CloseTicketExternalTask implements IExternalTask {
  messageName: string;
  constructor(messageName: string) {
    this.messageName = messageName;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ CLOSING TICKET STARTED------------\n");

    const cm = new CommunicationManager();
    await cm.sendMessage(
      cm.generateMessageDTO(
        this.messageName,
        task.businessKey,
        cm.getVariables(task, ["id"])
      )
    );

    await taskService.complete(task);

    console.log("\n\n------------ CLOSING TICKET TERMINATED ------------\n");
  }
}
