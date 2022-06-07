export class User {
  id: string ;
  name: string | undefined;
  username: string | undefined;
  password: string | undefined;
  creationDate: Date;
  endDate: Date;
  
  constructor({
    id,
    name,
    username,
    password,
    creationDate,
    endDate,
  }: {
    id: string;
    name?: string;
    username?: string;
    password?: string;
    creationDate: Date;
    endDate: Date;
  }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password= password;
    this.creationDate = creationDate;
    this.endDate = endDate;
  }
}
