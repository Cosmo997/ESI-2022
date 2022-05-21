import { Client, ValueMap } from "camunda-external-task-client-js";
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
  constructor(clientManager: ClientManager) {
    this.clientManager = clientManager;
  }
  public subscribeToTopic(topic: string, externalTask: IExternalTask) {
    const client = this.clientManager.getNewClient();
    client.subscribe(topic, async ({ task, taskService }) => {
      await externalTask.execute(task, taskService);
      client.stop();
    });
  }

  protected generateCorrelationMessageDTO(
    messageName: string,
    businessKey: string | undefined,
    variables: ValueMap
  ): CorrelationMessageDto {
    const jsonObject = JSON.parse(JSON.stringify(variables));
    let map = new Map<string, any>();
    for (var value in jsonObject) {
      map.set(value, jsonObject[value]);
    }
    this.printVariables(map);
    let processVariables: { [key: string]: VariableValueDto } = {};
    for (let [key, value] of map) {
      processVariables[key] = {
        value: value,
        type: titleCaseWord(typeof value),
      };
    }
    const correlationMessageDto: CorrelationMessageDto = {
      messageName: messageName,
      businessKey: businessKey,
      processVariables: processVariables,
    };
    return correlationMessageDto;
  }

  protected async sendMessage(correlationMessageDto: CorrelationMessageDto) {
    const messageController = new MessageController();
    await messageController.sendMessage(correlationMessageDto);
    console.log("\nMessage Sent!\n");
  }

  protected printVariables(map: Map<string, any>) {
    console.log("\nTASK VARIABLES: \n");
    for (let [key, value] of map) {
      if (value != undefined) {
        console.log(`${titleCaseWord(key)} :`, value);
      }
    }
  }
}
