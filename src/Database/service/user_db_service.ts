import { JsonDB } from "node-json-db";
import { DbElemnt, Ticket } from "../../Model/Ticket";
import { LoccioniUser } from "../../Model/User";
import { collectionPath } from "../DbPath";
import { GenericDbService } from "./generic_db_service";

export class UserDbService {
  dbService: GenericDbService;
  constructor(dbService: GenericDbService) {
    this.dbService = dbService;
  }

  public getAll(): Array<LoccioniUser> {
    return this.dbService.getAll();
  }

  public getById(id: string): LoccioniUser | undefined {
    return this.dbService.getById(id);
  }

  public create(model: LoccioniUser): LoccioniUser {
    return this.dbService.create(model);
  }

  public update(model: LoccioniUser): LoccioniUser {
    return this.dbService.update(model, model.id);
  }

  public delete(id: string) {
    return this.dbService.delete(id);
  }
}
