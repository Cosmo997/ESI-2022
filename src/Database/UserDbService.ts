import { JsonDB } from "node-json-db";
import { v4 } from "uuid";
import { User } from "./Model/User";

class UserDbService {
  repo: JsonDB;
  userCollection = "/user";
  constructor(_repo: JsonDB) {
    this.repo = _repo;
  }

  public getUser(_id: String): User {
    try {
      return this.repo.getData(this.userCollection + "/" + _id);
    } catch (err) {
      console.log("No user found");
      console.error(err);
    }
    return null! as User;
  }

  public getAll(): Array<User> {
    try {
      return this.repo.getData(this.userCollection);
    } catch (err) {
      console.error(err);
    }
    return null! as Array<User>;
  }
  public createUser(_user: User): User {
    var userId = v4();
    this.repo.push(this.userCollection + "/" + userId, _user);
    _user.id = userId;
    return _user;
  }

  public updateUser(_user: User): User {
    this.repo.push(this.userCollection + "/" + _user.id, _user);
    return _user;
  }
}
