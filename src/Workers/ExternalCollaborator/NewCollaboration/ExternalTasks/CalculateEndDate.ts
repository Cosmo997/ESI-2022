import { Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";
import { v4 } from "uuid";

/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
export async function subToCalculateEndDate() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe(
    "calculate-end-date",
    async function ({ task, taskService }) {
      console.log("\n\n------------ CALCULATE USER END DATE ------------\n");
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var endDate = new Date(year + 1, month, day);
      const newProcessVariables = new Variables().set("user-end-date", endDate);

      taskService.complete(task, newProcessVariables);
      console.log("\nEnd Date Calculated!\n");

      console.log(
        "\n------------ CALCULATE USER END DATE TERMINATED------------\n\n"
      );
      //client.stop();
    }
  );
}
