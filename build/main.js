"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camunda_config_1 = require("./config/camunda-config");
const client_1 = require("./client");
const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
const client = clientManager.getCLient();
client.subscribe("creditScoreChecker", async function ({ task, taskService }) {
    // Put your business logic
    // complete the task
    await taskService.complete(task);
});
