import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../CommunicationManager";
import { IExternalTask } from "../../IExternalTask";

export class CloseTicketExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ CLOSING TICKET STARTED------------\n");

    const cm = new CommunicationManager();
    await cm.sendMessage(
      cm.generateMessageDTO(
        "close-ticket",
        task.businessKey,
        cm.getVariables(task, ["id"])
      )
    );

    await taskService.complete(task);

    console.log("\n\n------------ CLOSING TICKET TERMINATED ------------\n");
  }
}
