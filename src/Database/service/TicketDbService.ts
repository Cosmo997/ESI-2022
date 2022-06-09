import { JsonDB } from "node-json-db";
import { Ticket } from "../../Model/Ticket";
import { ticketPath, userPath } from "../DbPath";

export class TicketDbService {
  repo: JsonDB;
  ticketCollection = "/tickets";
  constructor(_repo: JsonDB) {
    this.repo = _repo;
  }

  public getTicket(id: string): Ticket {
    try {
      return this.repo.getData(ticketPath(id));
    } catch (err) {
      console.log("No ticket found");
      console.error(err);
    }
    return null! as Ticket;
  }

  public getAll(): Array<Ticket> {
    try {
      return this.repo.getData(this.ticketCollection);
    } catch (err) {
      console.error(err);
    }
    return null! as Array<Ticket>;
  }

  public createTicket(ticket: Ticket): Ticket {
    this.repo.push(ticketPath(ticket.id), ticket);
    return ticket;
  }

  public updateTicket(ticket: Ticket): Ticket {
    this.repo.push(ticketPath(ticket.id), ticket);
    return ticket;
  }

  public deleteTicket(_user: Ticket) {
    this.repo.delete(ticketPath(_user.id));
  }
}
