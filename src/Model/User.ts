import { DbElemnt } from "./Ticket";

export class LoccioniUser implements DbElemnt {
  id: string;
  name: string;
  surname: string;
  username?: string | undefined;
  password?: string | undefined;
  creationDate: Date;
  endDate: Date | undefined;
  isActive: boolean;

  constructor({
    id,
    name,
    surname,
    username,
    password,
    creationDate,
    endDate,
    isActive = true,
  }: {
    id: string;
    name: string;
    surname: string;
    username?: string;
    password?: string;
    creationDate: Date;
    endDate?: Date;
    isActive: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.password = password;
    this.creationDate = creationDate;
    this.endDate = endDate;
    this.isActive = isActive;
  }
}
