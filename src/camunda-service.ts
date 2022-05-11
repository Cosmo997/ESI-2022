import axios from "axios";
import { baseUrl } from "./config/camunda-config";

export class CamundaService {
  private config = {
    baseUrl: "",
    use: logger,
  };
  private client: Client;

  constructor(_url: string) {
    this.config.baseUrl = _url;
    this.client = new Client(this.config);
  }

  public getCLient(): Client {
    return this.client;
  }
}
