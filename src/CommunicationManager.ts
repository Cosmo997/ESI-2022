import { Task, ValueMap, Variables } from "camunda-external-task-client-js";
import {
  CorrelationMessageDto,
  VariableValueDto,
} from "./Utils/api/src/generated-sources/openapi";
import { MessageController } from "./Utils/APIController/message_controller";
import { mapToDtoVariables } from "./Utils/Helpers/camunda_process_helper";
import { titleCaseWord } from "./Utils/Helpers/extension";

export class CommunicationManager {
  message_controller = new MessageController();

  constructor() {}

  public generateMessageDTO(
    messageName: string,
    businessKey: string | undefined,
    variables: Map<string, any>
  ): CorrelationMessageDto {
    // TODO aggiornare con mapToDtoVariables
    let processVariables: { [key: string]: VariableValueDto } =
      mapToDtoVariables(variables);

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
    this.printValueMap(variables);
    let processVariables: { [key: string]: VariableValueDto } = {};
    for (let [key, value] of Object.entries(variables)) {
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

  private printValueMap(map: ValueMap) {
    console.log("\nTASK VARIABLES: \n");
    for (let [key, value] of Object.entries(map)) {
      if (value != undefined) {
        console.log(`${titleCaseWord(key)} :`, value);
      }
    }
  }

  public getVariablesFromTask(
    task: Task,
    variables: string[]
  ): Map<string, any> {
    let map = new Map<string, any>();
    variables.forEach((element) => {
      map.set(element, task.variables.get(element));
    });
    return map;
  }

  public getVariables(
    processVariables: Variables,
    variables: string[]
  ): Map<string, any> {
    let map = new Map<string, any>();
    variables.forEach((element) => {
      map.set(element, processVariables.get(element));
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
