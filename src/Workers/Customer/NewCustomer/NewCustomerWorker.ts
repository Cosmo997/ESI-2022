import { ClientManager } from "../../../client";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { SubManager } from "../../../SubManager";
import { CloseTicketExternalTask } from "../../HelpDesk/CloseTicket";
import { OpenTicketExternalTask } from "../../HelpDesk/OpenTicket";
import { NotifyCredentialExternalTask } from "./Task/NotifyCredential";
import { helpDeskStart } from "../../HelpDesk/HelpDesk";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  helpDeskStart({
    messageTo: "new-ticket-created-message-new-customer",
    messageOwner: "closed-ticket-message-new-customer",
  });

  // Open ticket
  subManager.subscribeToTopic(
    "open-ticket-task-new-customer",
    new OpenTicketExternalTask()
  );

  // Close ticket
  subManager.subscribeToTopic(
    "close-ticket-task-new-customer",
    new CloseTicketExternalTask()
  );

  // Notify Credentials
  subManager.subscribeToTopic(
    "notify-credential-task-new-customer",
    new NotifyCredentialExternalTask("recive-credential-message-new-customer", [
      "customer-user",
      "customer-pass",
    ])
  );
}
