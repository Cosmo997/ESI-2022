"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camunda_config_1 = require("./config/camunda-config");
const client_1 = require("./client");
const openapi_1 = require("./api/src/generated-sources/openapi");
const axios_1 = __importDefault(require("axios"));
const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
const client = clientManager.getCLient();
client.subscribe("creditScoreChecker", async function ({ task, taskService }) {
    // Put your business logic
    // complete the task
    await taskService.complete(task);
});
const axiosInstance = axios_1.default.create({
    baseURL: camunda_config_1.baseUrl,
    timeout: 1000,
});
const apiConfig = new openapi_1.Configuration({});
const engineApi = new openapi_1.EngineApi(apiConfig, camunda_config_1.baseUrl, axiosInstance);
const res = engineApi.getProcessEngineNames();
res.then(function (result) {
    console.log(result);
});
