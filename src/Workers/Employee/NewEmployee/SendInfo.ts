import { baseUrl } from "../../../config/camunda-config";
import { ClientManager } from "../../../client";
import { Axios } from "../../../../node_modules/axios"

const clientManager = new ClientManager(baseUrl);

const client = clientManager.getCLient();

client.subscribe("send-info", async function ({ task, taskService }) {
  // Put your business logic

//   const email = task.variables.get('email');
//   const nome = task.variables.get('nome');
//   const cognome = task.variables.get('cognome');

//   const res = Axios

  // complete the task
  await taskService.complete(task);
});
