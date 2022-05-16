import { baseUrl } from "../../../config/camunda-config";
import { ClientManager } from "../../../client";
import axios from "axios";

/**
 * Prendere credenziali e stamparle
 */
export async function subToNotifyCredential() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  client.subscribe("notify-credential", async function ({ task, taskService }) {
    console.log("\n\n------------NOTIFY CREDENTIAL START------------\n");

    const email = task.variables.get("email");
    const nome = task.variables.get("nome");
    const cognome = task.variables.get("cognome");
    const id = task.variables.get("ID");
    const neededInfo = task.variables.get("needed-info");
    const businessKey = task.businessKey;

    console.log("\nEmail sended to " + email + ".");

    const utente = task.variables.get("utente");
    const password = task.variables.get("password");

    console.log("Credentials: \n");
    console.log("Utente: " + utente + "\n");
    console.log("Password: " + password);

    await taskService.complete(task);

    console.log("\n------------NOTIFY CREDENTIAL FINISH------------\n\n");
  });
}
