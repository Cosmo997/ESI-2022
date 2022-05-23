import { Task, ValueMap } from "camunda-external-task-client-js";
import {
  CorrelationMessageDto,
  VariableValueDto,
} from "../../api/src/generated-sources/openapi";
import { MessageController } from "../../APIController/message_controller";
import { titleCaseWord } from "../../Helpers/extension";

export function generateCorrelationMessageDTO(
  messageName: string,
  businessKey: string | undefined,
  variables: Map<string, any>
): CorrelationMessageDto {
  let processVariables: { [key: string]: VariableValueDto } = {};

  for (let [key, value] of variables) {
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

function printVariables(map: Map<string, any>) {
  console.log("\nTASK VARIABLES: \n");
  for (let [key, value] of map) {
    if (value != undefined) {
      console.log(`${titleCaseWord(key)} :`, value);
    }
  }
}

export function getVariables(
  task: Task,
  variables: String[]
): Map<string, any> {
  let map = new Map<string, any>();
  for (var variable in variables) {
    map.set(variable, task.variables.get(variable));
  }
  return map;
}
