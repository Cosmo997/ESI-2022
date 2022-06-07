import { JsonDB } from "node-json-db";
import { UserDbService } from "./UserDbService";
import { dbRepoInstance } from "./DbRepoInstance";
import { User } from "./Model/User";
import { v4 } from "uuid";
main();

function main() {
  // Creamo il DB;

  const dbService = new UserDbService(dbRepoInstance);
  // Scriviamo un utente
  var user: User = new User({
    id: v4(),
    name: "Mario",
    username: "Rossi",
    password: "password",
    creationDate: new Date(),
    endDate: new Date(),
  });

  user = dbService.createUser(user);

  console.log("Tutti: " + dbService.getAll());

  // Leggiamo un utente
  console.log("Utente 1:" + user);
  if (user.id != undefined)
    console.log("Get by ID: " + dbService.getUser(user.id));

  // Aggiorniamo un utente
  dbService.getUser(user.id).name = "Francesco";
  console.log("User aggiornato: " + dbService.updateUser(user));

  // Delete utente
}
