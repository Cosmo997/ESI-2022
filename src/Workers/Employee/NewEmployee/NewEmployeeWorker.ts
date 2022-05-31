import { ClientManager } from "../../../client";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { SubManager } from "../../../SubManager";
import { NotifyCredentialExternalTask } from "./Task/NotifyCredential";
import { SendEmailExternalTask } from "./Task/SendEmail";
import { SendInfoExternalTask } from "./Task/SendInfo";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  subManager.subscribeToTopic(
    "send-info-new-employee",
    new SendInfoExternalTask()
  );

  subManager.subscribeToTopic(
    "send-email-new-employee",
    new SendEmailExternalTask()
  );

  subManager.subscribeToTopic(
    "notify-credential-new-employee",
    new NotifyCredentialExternalTask()
  );
}
