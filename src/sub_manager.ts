import { Client, Task, ValueMap } from "camunda-external-task-client-js";
import {
  CorrelationMessageDto,
  VariableValueDto,
} from "./api/src/generated-sources/openapi";
import { MessageController } from "./APIController/message_controller";
import { ClientManager } from "./client";
import { titleCaseWord } from "./Helpers/extension";
import { IExternalTask } from "./IExternalTask";

export class SubManager {
  clientManager: ClientManager;
  clientCounter = 1;
  constructor(clientManager: ClientManager) {
    this.clientManager = clientManager;
  }
  public subscribeToTopic(topic: string, externalTask: IExternalTask) {
    var clientCount = this.clientCounter;
    console.log("created client: " + clientCount);
    this.clientCounter++;
    const client = this.clientManager.getNewClient();
    client.subscribe(topic, async ({ task, taskService }) => {
      await taskService.handleFailure(task, {
        errorMessage: task.errorMessage,
        errorDetails: task.errorDetails,
        retries: 1,
        retryTimeout: 1000,
      });
      await externalTask.execute(task, taskService);
      return;
      console.log(
        "Stopped client: '" + topic + "'\nClient num: " + clientCount
      );
    });

    client.on("complete:success", function (task) {
      client.stop();
      console.log(client);
    });
  }
}
