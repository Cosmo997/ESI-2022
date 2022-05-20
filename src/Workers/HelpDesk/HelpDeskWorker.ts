import {
  Client,
  TopicSubscription,
  ValueMap,
  Variables,
} from "camunda-external-task-client-js";
import {
  CorrelationMessageDto,
  VariableValueDto,
} from "../../api/src/generated-sources/openapi";
import { ClientManager } from "../../client";
import { baseUrl } from "../../config/camunda-config";
import { titleCaseWord } from "../../Helpers/extension";
import { MessageController } from "../../APIController/message_controller";
import { v4 } from "uuid";
import { SubManager } from "../../sub_manager";

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
      // TODO (Vedere se funzia ugualmente)
      // task.variables.setAll({ "ticket-save-date": new Date(), ticketId: v4() });
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
