import { Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";
import { v4 } from "uuid";
import { Collaborator } from "../../../../Model/Collaborator";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToSaveCollaboratorInformations() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe(
    "save-collaborator-informations",
    async function ({ task, taskService }) {
      console.log(
        "\n\n------------ SAVE COLLABORATOR INFORMATIONS ------------\n"
      );

      const collaboratorInfo = task.variables.get("collaboratorInfo");
      console.log(collaboratorInfo);
      taskService.complete(task);
      console.log("\nEnd Date Calculated!\n");

      console.log(
        "\n------------ SAVE COLLABORATOR INFORMATIONS TERMINATED------------\n\n"
      );
      //client.stop();
    }
  );
}
