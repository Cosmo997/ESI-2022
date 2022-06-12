import { DbElemnt } from "./Ticket";

export class LoccioniUser implements DbElemnt {
  id: string;
  name: string;
  username: string;
  password: string;
  creationDate: Date;
  endDate: Date | undefined;
  isActive: boolean;

  constructor({
    id,
    name,
    username,
    password,
    creationDate,
    endDate,
    isActive = true,
  }: {
    id: string;
    name: string;
    username: string;
    password: string;
    creationDate: Date;
    endDate?: Date;
    isActive: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.creationDate = creationDate;
    this.endDate = endDate;
    this.isActive = isActive;
  }
}
