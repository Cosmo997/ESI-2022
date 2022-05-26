import { MessageController } from "../../../Utils/APIController/message_controller";
import { ClientManager } from "../../../client";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { SubManager } from "../../../SubManager";
import { CloseTicketExternalTask } from "../../HelpDesk/CloseTicket";
import { NotifyTicketITExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicketIT";
import { OpenTicketExternalTask } from "../../HelpDesk/OpenTicket";
import { SaveTicketExternalTask } from "../../HelpDesk/ExternalTasks/SaveTicket";
import { UpdateTicketExternalTask } from "../../HelpDesk/ExternalTasks/UpdateTicket";
import { NotifyTicketOwnerExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicketOwner";
import { NotifyCredentialExternalTask } from "./Task/NotifyCredential";
import { helpDeskStart } from "../../HelpDesk/HelpDesk";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  helpDeskStart("new-ticket-created-message-new-customer","closed-ticket-message-new-customer")

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
