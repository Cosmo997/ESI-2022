import { JsonDB } from "node-json-db";
import { v4 } from "uuid";
import { userPath } from "../DbPath";

import bcrypt from "bcrypt";
import { LoccioniUser } from "../../Model/User";

function hashIt(password: string): string {
  const salt = bcrypt.genSaltSync(6);
  return bcrypt.hashSync(password, salt);
}

export class UserDbService {
  repo: JsonDB;
  userCollection = "/user";
  constructor(_repo: JsonDB) {
    this.repo = _repo;
  }

  public getUser(_id: string): LoccioniUser {
    try {
      return this.repo.getData(userPath(_id));
    } catch (err) {
      console.log("No user found");
      console.error(err);
    }
    return null! as LoccioniUser;
  }

  public getAll(): Array<LoccioniUser> {
    try {
      console.log(this.repo.getData(this.userCollection));
      return this.repo.getData(this.userCollection);
    } catch (err) {
      console.error(err);
    }
    return null! as Array<LoccioniUser>;
  }

  public createUser(_user: LoccioniUser): LoccioniUser {
    _user.password = hashIt(_user.password);
    this.repo.push(userPath(_user.id), _user);
    return _user;
  }

  public updateUser(_user: LoccioniUser): LoccioniUser {
    this.repo.push(userPath(_user.id), _user);
    return _user;
  }

  public deleteUser(_user: LoccioniUser) {
    this.repo.delete(userPath(_user.id));
  }
}
