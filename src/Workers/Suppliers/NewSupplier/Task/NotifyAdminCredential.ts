import { CorrelationMessageDto } from "../../../../api/src/generated-sources/openapi/api";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";

export async function subToNotifyCredentialToAdminForNewSupplier() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe(
    "notify-admin-new-supplier",
    async function ({ task, taskService }) {
      console.log("\n\n------------ NOTIFY ADMIN CREDENTIAL ------------\n");

      const username = task.variables.get("supp-username");
      const password = task.variables.get("supp-password");
      const businessKey = task.businessKey;

      console.log("Variables: \n");
      console.log("Username: " + username + "\n");
      console.log("Password: " + password + "\n");
      console.log("Business Key: " + businessKey + "\n");

      const correlationMessageDto: CorrelationMessageDto = {
        messageName: "notify-admin-credential-new-supplier",
        businessKey: businessKey,
        processVariables: {
          username: { value: username, type: "String" },
          password: { value: password, type: "String" },
        },
      };
      await messageController.sendMessage(correlationMessageDto);
      console.log("\nMessage Sent!\n");
      
      await taskService.complete(task);
      console.log("\n------------ NOTIFY ADMIN CREDENTIAL TERMINATED------------\n\n");
      
      client.stop();
    }
  );
}
