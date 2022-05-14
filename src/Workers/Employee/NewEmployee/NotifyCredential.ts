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
    const utente = task.variables.get('utente');
    const password = task.variables.get('password');
    
    console.log('Utente: ' + utente + '\n');
    console.log('Password: ' + password);

    
    await taskService.complete(task);
  });
}

