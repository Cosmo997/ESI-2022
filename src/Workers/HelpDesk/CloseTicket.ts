import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../CommunicationManager";
import { IExternalTask } from "../../IExternalTask";

export class CloseTicketExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ CLOSING TICKET STARTED------------\n");

    const cm = new CommunicationManager();
    await cm.sendMessage(
      cm.generateMessageDTOAll(
        "close-ticket",
        task.businessKey,
        task.variables.getAll()
      )
    );
    await taskService.complete(task);

    console.log("\n\n------------ CLOSING TICKET TERMINATED ------------\n");
  }
}
