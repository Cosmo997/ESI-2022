import { ClientManager } from "./client";
import { IExternalTask } from "./IExternalTask";

export class SubManager {
  clientManager: ClientManager;
  constructor(clientManager: ClientManager) {
    this.clientManager = clientManager;
  }
  public subscribeToTopic(topic: string, externalTask: IExternalTask) {
    const client = this.clientManager.getNewClient();
    client.subscribe(topic, async ({ task, taskService }) => {
      await taskService.handleFailure(task, {
        errorMessage: task.errorMessage,
        errorDetails: task.errorDetails,
        retries: 1,
        retryTimeout: 1000,
      });
      await externalTask.execute(task, taskService);
      client.stop();
    });
  }
}
