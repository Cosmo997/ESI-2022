import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { ticketDB } from "../../../Database/DbRepoInstance";
import { TicketDbService } from "../../../Database/service/TicketDbService";
import { IExternalTask } from "../../../IExternalTask";
import { Ticket } from "../../../Model/Ticket";
import { titleCaseWord } from "../../../Utils/Helpers/extension";

export class UpdateTicketExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ UPDATING TICKET ------------\n");

    //TODO UPDATE the ticket on DB
    // 1. prendo oggetto ticket dalle task variable
    console.log("ticket from variable: " + task.variables.get("ticket"));

    const ticketFromTask: Ticket = JSON.parse(task.variables.get("ticket"));

    console.log("ticket from task: " + ticketFromTask.id);
    // 2. aggiorno stato del ticket a closed
    const ticketService = new TicketDbService(ticketDB);
    var updatedTicket = ticketService.getTicket(ticketFromTask.id);
    updatedTicket.status = "closed";
    updatedTicket.closingDate = new Date();

    // 3. Lo aggiorno dal db
    const tick = ticketService.updateTicket(updatedTicket);

    console.log(
      `Ticket ID: ${tick.id} \nStatus: ${tick.status}\nClosing date: ${tick.closingDate}`
    );

    // Ovveride ticket value inside task.variables
    const newProcessVariables = new Variables().set(
      "ticket",
      JSON.stringify(tick)
    );

    console.log("\n\n------------ TICKET UPDATED ------------\n");

    await taskService.complete(task, newProcessVariables);
    console.log("\n\n------------ UPDATING TICKET TERMINATED ------------\n");
  }
}
