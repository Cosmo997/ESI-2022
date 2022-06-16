import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { v4 } from "uuid";
import { CommunicationManager } from "../../CommunicationManager";
import { IExternalTask } from "../../IExternalTask";

export class OpenTicketExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ OPENING TICKET ------------\n");
    const variables = task.variables.getAll();
    const cm = new CommunicationManager();
    const message = cm.generateMessageDTOAll(
      "new-ticket",
      task.businessKey,
      variables
    );

    await cm.sendMessage(message);

    await taskService.complete(task);
    console.log("\n\n------------ OPENING TICKET TERMINATED ------------\n");
  }
}
