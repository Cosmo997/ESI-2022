import { baseUrl } from "../../../config/camunda-config";
import { ClientManager } from "../../../client";
import axios from "axios";

/**
 * Prendere credenziali e stamparle
 */
export function notifyCredential(){

    const clientManager = new ClientManager(baseUrl);

    const client = clientManager.getCLient();
  

  client.subscribe('notify-credential',async function ({task, taskService}) {

    console.log("\n\n------------NOTIFY CREDENTIAL START------------\n");


    const utente = task.variables.get('utente');
    const password = task.variables.get('password');

    console.log("Variables: \n");
    console.log('Utente: ' + utente + '\n');
    console.log('Password: ' + password);

    
    await taskService.complete(task);

    console.log("\n------------NOTIFY CREDENTIAL FINISH------------\n\n");

  });
}

