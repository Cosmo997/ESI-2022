import { baseUrl } from "./config/camunda-config";
import { ClientManager } from "./client";

const clientManager = new ClientManager(baseUrl);

const client = clientManager.getCLient();

client.subscribe("creditScoreChecker", async function ({ task, taskService }) {
  // Put your business logic
  // complete the task
  await taskService.complete(task);
});
