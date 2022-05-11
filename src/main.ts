import { baseUrl } from "./config/camunda-config";
import { ClientManager } from "./client";
import {
  EngineApi,
  Configuration,
  ConfigurationParameters,
} from "./api/src/generated-sources/openapi";
import axios, { AxiosInstance } from "axios";

const clientManager = new ClientManager(baseUrl);

const client = clientManager.getCLient();

client.subscribe("creditScoreChecker", async function ({ task, taskService }) {
  // Put your business logic
  // complete the task
  await taskService.complete(task);
});

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
});

const apiConfig = new Configuration({});

const engineApi = new EngineApi(apiConfig, baseUrl, axiosInstance);
const res = engineApi.getProcessEngineNames();

res.then(function (result) {
  console.log(result);
});
