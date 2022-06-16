import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";

var hrSystemDB: JsonDB = new JsonDB(
  new Config("hr_system_db", true, false, "/")
);
var userManagmentSystemDB: JsonDB = new JsonDB(
  new Config("user_management_system_db", true, false, "/")
);
var ticketDB: JsonDB = new JsonDB(new Config("ticket_db", true, false, "/"));

export { hrSystemDB, userManagmentSystemDB, ticketDB };
