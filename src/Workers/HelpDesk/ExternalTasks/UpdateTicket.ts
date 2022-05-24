import { Task, TaskService } from "camunda-external-task-client-js";
import { IExternalTask } from "../../../IExternalTask";
import { Ticket } from "../../../Model/Ticket";
import {} from "../../../CommunicationManager";

export class UpdateTicketExternalTask implements IExternalTask {
  // TODO: Inviare solo ticket? Fare Update su DB?
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ UPDATING TICKET ------------\n");
    var ticket: Ticket = JSON.parse(task.variables.get("ticket"));

    console.log("Ticket Updated: " + JSON.stringify(ticket));
    // do someting...
    await taskService.complete(task);
    console.log("\n\n------------ UPDATING TICKET TERMINATED ------------\n");
  }
}
