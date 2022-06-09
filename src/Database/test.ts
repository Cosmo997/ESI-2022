import { hrSystemDB, ticketDB, userManagmentSystemDB } from "./DbRepoInstance";
import { LoccioniUser } from "../Model/User";
import { Ticket } from "../Model/Ticket";
import { GenericDbService } from "./service/generic_db_service";
import { v4 } from "uuid";
// mainTicket();

mainUser();

function mainUser() {
  var userDbService = new GenericDbService(userManagmentSystemDB);

  var user = new LoccioniUser({
    id: v4(),
    name: "Michele",
    username: "Mario",
    password: "Password",
    creationDate: new Date(),
  });

  userDbService.create<LoccioniUser>("/users", user);
}

function mainTicket() {
  var ticketDbSerivce = new GenericDbService(ticketDB);
  var ticket = new Ticket({
    id: v4(),
    status: "open",
    openingDate: new Date(),
  });

  // Create ticket
  ticketDbSerivce.create<Ticket>("/tickets", ticket);
  const tickets = ticketDbSerivce.getAll<Ticket>("/tickets");
  for (const ticket of tickets) {
    console.log(ticket.id);
  }

  // Get ticket
  var tick = ticketDbSerivce.getById<Ticket>("/tickets", ticket.id);
  console.log(tick);

  // Update ticket
  if (tick != undefined) {
    tick.status = "BOH";
    ticketDbSerivce.update("/tickets", tick);
  }

  // Delete ticket
  //   ticketDbSerivce.delete("/tickets", tick?.id ?? "");
}
