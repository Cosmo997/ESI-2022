export interface DbElemnt {
  id: string;
}

export class Ticket implements DbElemnt {
  id: string;
  description?: string;
  status: string;
  openingDate: Date;
  closingDate?: Date;

  constructor({
    id,
    description,
    status,
    openingDate,
    closingDate,
  }: {
    id: string;
    description?: string;
    status: string;
    openingDate: Date;
    closingDate?: Date;
  }) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.openingDate = openingDate;
    this.closingDate = closingDate;
  }
}
