export interface DbElemnt {
  id: string;
}

export class Ticket implements DbElemnt {
  id: string;
  description?: string;
  status: string;
  openingDate: Date;
  closingDate?: Date;
  ticketType?: string;

  constructor({
    id,
    description,
    status,
    openingDate,
    closingDate,
    ticketType,
  }: {
    id: string;
    description?: string;
    status: string;
    openingDate: Date;
    closingDate?: Date;
    ticketType?: string;
  }) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.openingDate = openingDate;
    this.closingDate = closingDate;
    this.ticketType = ticketType;
  }
}
