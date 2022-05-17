import { baseUrl } from "./config/camunda-config";
import { ClientManager } from "./client";
import {
  EngineApi,
  Configuration,
  ConfigurationParameters,
  ProcessDefinitionApi
} from "./api/src/generated-sources/openapi";
import axios, { AxiosInstance } from "axios";

const clientManager = new ClientManager(baseUrl);

const client = clientManager.getClient();

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
