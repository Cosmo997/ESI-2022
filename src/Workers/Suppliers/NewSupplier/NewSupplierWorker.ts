import { MessageController } from "../../../APIController/message_controller";
import { ClientManager } from "../../../client";
import { baseUrl } from "../../../config/camunda-config";
import { SubManager } from "../../../sub_manager";
import { CloseTicketExternalTask } from "../../HelpDesk/ExternalTasks/CloseTicket";
import { NotifyTicketExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicket";
import { OpenTicketExternalTask } from "../../HelpDesk/ExternalTasks/OpenTicket";
import { SaveTicketExternalTask } from "../../HelpDesk/ExternalTasks/SaveTicket";
import { UpdateTicketExternalTask } from "../../HelpDesk/ExternalTasks/UpdateTicket";
import { NotifyCredentialExternalTask } from "./Task/NotifyCredential";
import { NotifySupplierCredentialExternalTask } from "./Task/NotifySupplierCredential";

main();

async function main() {
  // subToOpenTicketForNewSupplier();
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  const messageController = new MessageController();

  // Open ticket
  subManager.subscribeToTopic(
    "open-ticket-new-supplier",
    new OpenTicketExternalTask(
      messageController,
      "new-ticket-message-new-supplier"
    )
  );

  // Save ticket
  subManager.subscribeToTopic(
    "save-ticket-new-supplier",
    new SaveTicketExternalTask()
  );

  // Update ticket
  subManager.subscribeToTopic(
    "update-ticket-new-supplier",
    new UpdateTicketExternalTask()
  );

  // Notify IT
  subManager.subscribeToTopic(
    "notify-it-developer-new-supplier",
    new NotifyTicketExternalTask(
      messageController,
      "notify-it-new-supplier-message"
    )
  );

  // Close ticket
  subManager.subscribeToTopic(
    "close-ticket-new-supplier",
    new CloseTicketExternalTask(messageController, "close-ticket-new-supplier")
  );

  // Notify Credentials to Admin
  subManager.subscribeToTopic(
    "notify-admin-new-supplier",
    new NotifyCredentialExternalTask("notify-admin-credential-new-supplier", [
      "supp-user",
      "supp-pass",
    ])
  );

  // Notify Ticket Owner
  subManager.subscribeToTopic(
    "notify-owner-new-supplier",
    new NotifyTicketExternalTask(
      messageController,
      "notify-ticket-owner-message-new-supplier"
    )
  );

  // Notify to supplier (manda email)
  subManager.subscribeToTopic(
    "notify-supplier-credential",
    new NotifySupplierCredentialExternalTask(["supp-user", "supp-pass"])
  );
}
