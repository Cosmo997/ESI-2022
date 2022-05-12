import { Client } from "camunda-external-task-client-js";
import axios, {AxiosRequestConfig} from "axios";
import { baseUrl } from "../../../config/camunda-config";
import { ClientManager } from "../../../client";

export function sendEmail(){


    const clientManager = new ClientManager(baseUrl);

    const client = clientManager.getCLient();
  

  client.subscribe('send-email',async function ({task, taskService}) {
    const email = task.variables.get('email');
    const nome = task.variables.get('nome');
    const cognome = task.variables.get('cognome');

    //TODO axios call
    const body =    {
      "messageName" : "info",
      "businessKey" : "businessKey",
      "processVariables" : {
        "email": {"value" : email, "type": "String"},
        "nome": {"value" : nome, "type": "String"},
        "congome": {"value" : cognome, "type": "String"},
      }
    };
    await axios.post('localhost:8080/engine-rest/message', body);

    await taskService.complete(task);
  });
}

