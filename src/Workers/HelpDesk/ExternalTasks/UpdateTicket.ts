import { Task, TaskService } from "camunda-external-task-client-js";
import { IExternalTask } from "../../../IExternalTask";

export class UpdateTicketExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ UPDATING TICKET ------------\n");
    console.log("\n\n------------ TICKET UPDATED TICKET ------------\n");

    await taskService.complete(task);
    console.log("\n\n------------ UPDATING TICKET TERMINATED ------------\n");
  }
}
