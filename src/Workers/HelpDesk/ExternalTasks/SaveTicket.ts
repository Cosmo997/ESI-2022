import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { v4 } from "uuid";
import { ticketDB } from "../../../Database/DbRepoInstance";
import { GenericDbService } from "../../../Database/service/generic_db_service";
import { IExternalTask } from "../../../IExternalTask";
import { Ticket } from "../../../Model/Ticket";

export class SaveTicketExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ SAVING TICKET ------------\n");

    //TODO Create the ticket on DB with status created
    const newTicket = new Ticket({
      id: v4(),
      description: "TicketDescription",
      openingDate: new Date(),
      status: "created",
    });

    //TODO Update the ticket on DB with status received
    // 1. Update ticket.instance.status = TicketStatus.received,
    // 2. Save ticket on DB
    const ticketService = new GenericDbService(ticketDB, "/tickets");
    ticketService.create<Ticket>(newTicket);

    const newProcessVariables = new Variables().set(
      "ticket",
      JSON.stringify(newTicket)
    );

    await taskService.complete(task, newProcessVariables);

    console.log(
      `\n------------SAVE TICKET OPERATION TERMINATED TASK ID: ${task.id} ------------\n\n`
    );
  }
}
