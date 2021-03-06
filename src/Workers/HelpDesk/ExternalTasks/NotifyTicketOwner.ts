import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../CommunicationManager";
import { IExternalTask } from "../../../IExternalTask";

export class NotifyTicketOwnerExternalTask implements IExternalTask {
  messageName: string;
  constructor(messageName: string) {
    this.messageName = messageName;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFYING TICKET OWNER------------\n");
    const cm = new CommunicationManager();

    await setTimeout(() => {}, 1000);

    await cm.sendMessage(
      cm.generateMessageDTOAll(
        this.messageName,
        task.businessKey,
        task.variables.getAll()
      )
    );

    await taskService.complete(task);
    console.log(
      "\n\n------------ NOTIFYING TICKET OWNER TERMINATED ------------\n"
    );
  }
}
