import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { Configuration } from "../api/src/generated-sources/openapi";
import { baseUrl } from "../config/camunda-config";

export abstract class AbstractController {
  public axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
  });

  public apiConfig = new Configuration({});

  public baseUrl = baseUrl;
}
