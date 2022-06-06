import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";

var dbRepoInstance: JsonDB = new JsonDB(
  new Config("loccioni_db", true, false, "/")
);

export { dbRepoInstance };

// class DbRepoInstance {
//   private static _instance: JsonDB = new JsonDB(
//     new Config("loccioni_db", true, false, "/")
//   );

//   private constructor() {}

//   public static get Instance() {
//     // Do you need arguments? Make it a regular static method instead.
//     return this._instance;
//   }
// }

// export { DbRepoInstance };
