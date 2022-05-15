import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../config/camunda-config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
});

export function getAxiosInstance() {
  return axiosInstance;
}
