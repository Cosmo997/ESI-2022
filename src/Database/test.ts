import { hrSystemDB, ticketDB, userManagmentSystemDB } from "./DbRepoInstance";
import { LoccioniUser } from "../Model/User";
import { Ticket } from "../Model/Ticket";
import { GenericDbService } from "./service/generic_db_service";
import { v4 } from "uuid";
mainTicket();

function mainTicket() {
  var ticketDbSerivce = new GenericDbService(ticketDB, "/tickets");
  var ticket = new Ticket({
    id: v4(),
    status: "open",
    openingDate: new Date(),
  });

  // Create ticket
  ticketDbSerivce.create<Ticket>(ticket);
  const tickets = ticketDbSerivce.getAll<Ticket>();
  for (const ticket of tickets) {
    console.log(ticket.id);
  }

  // Get ticket
  var tick = ticketDbSerivce.getById<Ticket>(ticket.id);
  console.log(tick);

  // Update ticket
  if (tick != undefined) {
    tick.status = "BOH";
    ticketDbSerivce.update(tick);
  }

  // Delete ticket
  // ticketDbSerivce.delete(tick?.id ?? "");
}
