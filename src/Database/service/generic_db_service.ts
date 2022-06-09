import { JsonDB } from "node-json-db";
import { DbElemnt, Ticket } from "../../Model/Ticket";
import { collectionPath } from "../DbPath";

export class GenericDbService {
  repo: JsonDB;
  constructor(_repo: JsonDB) {
    this.repo = _repo;
  }

  public getAll<T extends DbElemnt>(path: string): Array<T> {
    try {
      return this.repo.getObject<Array<T>>(path);
    } catch (err) {
      console.log("No element found");
      console.error(err);
      return [];
    }
  }

  public getById<T extends DbElemnt>(
    collectionName: string,
    id: string
  ): T | undefined {
    try {
      const index = this.repo.getIndex(collectionName, id);
      return this.repo.getObject<T>(collectionPath(collectionName, index));
    } catch (error) {
      console.log("No element found");
      console.error(error);
      return undefined;
    }
  }

  public create<T extends DbElemnt>(collectionName: string, model: T): T {
    this.append(collectionName, model);
    return model;
  }

  public update<T extends DbElemnt>(collectionName: string, model: T): T {
    const index = this.repo.getIndex(collectionName, model.id);
    this.repo.push(`${collectionName}[${index}]`, model);
    return model;
  }

  public delete(collectionName: string, id: string) {
    const index = this.repo.getIndex(collectionName, id);
    this.repo.delete(collectionPath(collectionName, index));
  }

  private append<T>(collectionName: string, model: T): void {
    this.repo.push(`${collectionName}[]`, model);
  }
}
