export class LoccioniUser {
  id: string;
  name: string;
  username: string;
  password: string;
  creationDate: Date;
  endDate: Date | undefined;

  constructor({
    id,
    name,
    username,
    password,
    creationDate,
    endDate,
  }: {
    id: string;
    name: string;
    username: string;
    password: string;
    creationDate: Date;
    endDate?: Date;
  }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.creationDate = creationDate;
    this.endDate = endDate;
  }
}
