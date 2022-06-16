import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../CommunicationManager";
import { IExternalTask } from "../../../IExternalTask";

export class NotifyTicketITExternalTask implements IExternalTask {
  messageName: string;
  constructor(messageName: string) {
    this.messageName = messageName;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFYING TICKET ------------\n");
    const cm = new CommunicationManager();

    const correlationMessage = cm.generateMessageDTOAll(
      this.messageName,
      task.businessKey,
      task.variables.getAll()
    );

    await cm.sendMessage(correlationMessage);

    await taskService.complete(task);
    console.log("\n\n------------ NOTIFYING TICKET TERMINATED ------------\n");
  }
}
