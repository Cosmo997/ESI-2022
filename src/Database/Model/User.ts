export class User {
  id: String;
  name: String;
  username: String;
  password: String;
  creationDate: Date;
  endDate: Date;
  constructor(
    _id: String,
    _name: String,
    _username: String,
    _password: String,
    _creationDate: Date,
    _endDate: Date
  ) {
    this.id = _id;
    this.name = _name;
    this.username = _username;
    this.password = _password;
    this.creationDate = _creationDate;
    this.endDate = _endDate;
  }
}
