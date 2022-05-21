import { MessageController } from "../../../APIController/message_controller";
import { ClientManager } from "../../../client";
import { baseUrl } from "../../../config/camunda-config";
import { SubManager } from "../../../sub_manager2";
import { CloseTicketExternalTask } from "../../HelpDesk/ExternalTasks/CloseTicket";
import { NotifyTicketExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicket";
import { OpenTicketExternalTask } from "../../HelpDesk/ExternalTasks/OpenTicket";
import { SaveTicketExternalTask } from "../../HelpDesk/ExternalTasks/SaveTicket";
import { UpdateTicketExternalTask } from "../../HelpDesk/ExternalTasks/UpdateTicket";
import { subToNotifySupplierCredentialForNewSupplier } from "./Task/NotifySupplierCredential";

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
    new SaveTicketExternalTask(messageController)
  );

  // Update ticket
  subManager.subscribeToTopic(
    "update-ticket-new-supplier",
    new UpdateTicketExternalTask(messageController)
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

  // Notify
  subManager.subscribeToTopic(
    "notify-admin-new-supplier",
    new NotifyTicketExternalTask(
      messageController,
      "notify-admin-credential-new-supplier"
    )
  );

  // Notify Ticket Owner
  subManager.subscribeToTopic(
    "notify-owner-new-supplier",
    new NotifyTicketExternalTask(
      messageController,
      "notify-ticket-owner-message-new-supplier"
    )
  );

  subToNotifySupplierCredentialForNewSupplier();
}
