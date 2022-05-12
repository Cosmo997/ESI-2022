import { Client } from "camunda-external-task-client-js";
import axios, {AxiosRequestConfig} from "axios";
import { ClientManager } from "../../../client";
import { baseUrl } from "../../../config/camunda-config";
import { sendMessage } from "../../../APIController/message_controller";

export async function subToSendNewEmployeeInformationServiceTask(){

  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getCLient();

  client.subscribe('send-info',async function ({task, taskService}) {
    const email = task.variables.get('email');
    const nome = task.variables.get('nome');
    const cognome = task.variables.get('cognome');
    const id = task.variables.get('ID');

    const businessKey = task.businessKey;

    console.log('Business Key: ' +businessKey);
    const body =    {
      "messageName" : "info",
      "businessKey" : businessKey,
      "processVariables" : {
        "email": {"value" : email, "type": "String"},
        "nome": {"value" : nome, "type": "String"},
        "cognome": {"value" : cognome, "type": "String"},
        "ID": {"value" : id, "type": "String"},
      }
    };
    await taskService.complete(task);
    await sendMessage(body);
    client.stop();
  });
}


