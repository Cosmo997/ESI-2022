import { Client, ValueMap, Variables } from "camunda-external-task-client-js";
import {
  CorrelationMessageDto,
  VariableValueDto,
} from "../../api/src/generated-sources/openapi";
import { ClientManager } from "../../client";
import { baseUrl } from "../../config/camunda-config";
import { titleCaseWord } from "../../Helpers/extension";
import { MessageController } from "../../APIController/message_controller";
import { v4 } from "uuid";

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

export class HelpDeskWorker extends SubManager {
  public openTicket(topic: string, messageName: string) {
    const client = new ClientManager(baseUrl).getClient();
    super.subWithMessage(client, topic, messageName);
  }

  public closeTicket(topic: string, messageName: string) {
    const client = new ClientManager(baseUrl).getClient();
    super.subWithMessage(client, topic, messageName);
  }

  public notifyTicket(topic: string, messageName: string) {
    const client = new ClientManager(baseUrl).getClient();
    super.subWithMessage(client, topic, messageName);
  }

  public saveTicket(topic: string) {
    const client = new ClientManager(baseUrl).getClient();
    client.subscribe(topic, async ({ task, taskService }) => {
      console.log(
        `\n\n------------ SAVE TICKET OPERATION STARTED \nTASK ID: ${task.id}------------\n`
      );
      const newProcessVariables = new Variables().setAll({
        "ticket-save-date": new Date(),
        ticketId: v4(),
      });

      // Put here save logic...

      await taskService.complete(task, newProcessVariables);

      console.log(
        `\n------------SAVE TICKET OPERATION TERMINATED \nTASK ID: ${task.id} ------------\n\n`
      );
      client.stop();
    });
  }

  public updateTicket(topic: string) {
    const client = new ClientManager(baseUrl).getClient();
    super.subWithoutMessage(client, topic);
  }
}
