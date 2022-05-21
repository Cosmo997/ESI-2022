import { ValueMap } from "camunda-external-task-client-js";
import {
  CorrelationMessageDto,
  VariableValueDto,
} from "../../api/src/generated-sources/openapi";
import { MessageController } from "../../APIController/message_controller";
import { titleCaseWord } from "../../Helpers/extension";

export function generateCorrelationMessageDTO(
  messageName: string,
  businessKey: string | undefined,
  variables: ValueMap
): CorrelationMessageDto {
  const jsonObject = JSON.parse(JSON.stringify(variables));
  let map = new Map<string, any>();
  for (var value in jsonObject) {
    map.set(value, jsonObject[value]);
  }
  printVariables(map);
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

export async function sendMessage(
  messageController: MessageController,
  correlationMessageDto: CorrelationMessageDto
) {
  await messageController.sendMessage(correlationMessageDto);
  console.log("\nMessage Sent!\n");
}

export function printVariables(map: Map<string, any>) {
  console.log("\nTASK VARIABLES: \n");
  for (let [key, value] of map) {
    if (value != undefined) {
      console.log(`${titleCaseWord(key)} :`, value);
    }
  }
}
