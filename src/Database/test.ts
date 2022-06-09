import { hrSystemDB, ticketDB } from "./DbRepoInstance";
import { UserDbService } from "./service/UserDbService";
import { LoccioniUser } from "../Model/User";
import { Ticket } from "../Model/Ticket";
import { TicketDbService } from "./service/TicketDbService";
main();

function main() {
  var userDbService = new UserDbService(hrSystemDB);
  var user1 = new LoccioniUser({
    id: "ciao2",
    name: "Michele",
    username: "Mik",
    password: "ciao2",
    creationDate: new Date(),
    endDate: new Date(),
  });

  userDbService.createUser(user1);
  userDbService.getAll();
}
