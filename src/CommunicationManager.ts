import { Task, ValueMap } from "camunda-external-task-client-js";
import {
  CorrelationMessageDto,
  VariableValueDto,
} from "./Utils/api/src/generated-sources/openapi";
import { MessageController } from "./Utils/APIController/message_controller";
import { titleCaseWord } from "./Utils/Helpers/extension";

export class CommunicationManager {
  message_controller = new MessageController();

  constructor() {}

  public generateMessageDTO(
    messageName: string,
    businessKey: string | undefined,
    variables: Map<string, any>
  ): CorrelationMessageDto {
    let processVariables: { [key: string]: VariableValueDto } = {};

    for (let [key, value] of variables) {
      console.log("\n" + key + "  " + value);
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

  public generateMessageDTOAll(
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

  public async sendMessage(correlationMessageDto: CorrelationMessageDto) {
    await this.message_controller.sendMessage(correlationMessageDto);
    console.log("\nMessage Sent!\n");
  }

  private printVariables(map: Map<string, any>) {
    console.log("\nTASK VARIABLES: \n");
    for (let [key, value] of map) {
      if (value != undefined) {
        console.log(`${titleCaseWord(key)} :`, value);
      }
    }
  }

  public getVariables(task: Task, variables: string[]): Map<string, any> {
    let map = new Map<string, any>();
    variables.forEach((element) => {
      map.set(element, task.variables.get(element));
    });
    return map;
  }

  public setVariables(task: Task, variables: string[]): Map<string, any> {
    let map = new Map<string, any>();
    variables.forEach((element) => {
      map.set(element, task.variables.get(element));
    });
    return map;
  }
}
