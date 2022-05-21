import { Client, ValueMap } from "camunda-external-task-client-js";
import { CorrelationMessageDto, VariableValueDto } from "./api/src/generated-sources/openapi";
import { MessageController } from "./APIController/message_controller";
import { titleCaseWord } from "./Helpers/extension";

export abstract class SubManager {
    public subWithMessage(client: Client, topic: string, messageName: string) {
      client.subscribe(topic, async ({ task, taskService }) => {
        const correlationMessageDto: CorrelationMessageDto =
          this.generateCorrelationMessageDTO(
            messageName,
            task.businessKey,
            task.variables.getAll()
          );
        await this.sendMessage(correlationMessageDto);
        await taskService.complete(task);
      });
    }
  
    public subWithoutMessage(client: Client, topic: string) {
      client.subscribe(topic, async ({ task, taskService }) => {
        // do someting...
        await taskService.complete(task);
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
  