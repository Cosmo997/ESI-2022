// Per i tipi abbiamo bisogno di fare npm i --save-dev @types/camunda-external-task-client-js
import { Client, ClientConfig, logger } from "camunda-external-task-client-js";

export class ClientManager {
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
