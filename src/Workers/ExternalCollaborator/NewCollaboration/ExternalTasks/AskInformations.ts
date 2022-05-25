import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../../Utils/api/src/generated-sources/openapi";
import { MessageController } from "../../../../Utils/APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../Utils/config/camunda-config";
import { IExternalTask } from "../../../../IExternalTask";
import { Collaborator } from "../../../../Model/Collaborator";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */

export class AskInformationsExternalTask implements IExternalTask {
  messageController: MessageController;
  constructor(messageController: MessageController) {
    this.messageController = messageController;
  }

  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ ASK USER INFORMATIONS ------------\n");

    const collaboratorInfo: Collaborator = {
      name: "Giuseppe",
      surname: "Rossi",
    };

    const businessKey = task.businessKey;

    const correlationMessageDto: CorrelationMessageDto = {
      messageName: "ask-information-message-new-collaborator",
      businessKey: businessKey,
      processVariables: {
        collaboratorInfo: {
          value: collaboratorInfo,
        },
      },
    };
    await taskService.complete(task);

    await this.messageController.sendMessage(correlationMessageDto);
    console.log("\nMessage Sent!\n");
    console.log(
      "\n------------ ASK USER INFORMATIONS TERMINATED ------------\n\n"
    );
  }
}
