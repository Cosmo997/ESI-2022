import { JsonDB } from "node-json-db";
import { DbElemnt, Ticket } from "../../Model/Ticket";
import { collectionPath } from "../DbPath";

export class GenericDbService {
  repo: JsonDB;
  schema: string;
  constructor(_repo: JsonDB, schema: string) {
    this.repo = _repo;
    this.schema = schema;
  }

  public getAll<T extends DbElemnt>(): Array<T> {
    try {
      return this.repo.getObject<Array<T>>(this.schema);
    } catch (err) {
      console.log("No element found");
      console.error(err);
      return [];
    }
  }

  public getById<T extends DbElemnt>(id: string): T | undefined {
    try {
      const index = this.repo.getIndex(this.schema, id);
      return this.repo.getObject<T>(collectionPath(this.schema, index));
    } catch (error) {
      console.log("No element found");
      console.error(error);
      return undefined;
    }
  }

  public create<T extends DbElemnt>(model: T): T {
    this.append(model);
    return model;
  }

  public update<T extends DbElemnt>(model: T): T {
    const index = this.repo.getIndex(this.schema, model.id);
    this.repo.push(`${this.schema}[${index}]`, model);
    return model;
  }

  public delete(id: string) {
    const index = this.repo.getIndex(this.schema, id);
    this.repo.delete(collectionPath(this.schema, index));
  }

  private append<T>(model: T): void {
    this.repo.push(`${this.schema}[]`, model);
  }
}
