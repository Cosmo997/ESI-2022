import { MessageController } from "../../../Utils/APIController/message_controller";
import { ClientManager } from "../../../client";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { SubManager } from "../../../SubManager";
import { CloseTicketExternalTask } from "../../HelpDesk/ExternalTasks/CloseTicket";
import { NotifyTicketExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicket";
import { OpenTicketExternalTask } from "../../HelpDesk/ExternalTasks/OpenTicket";
import { SaveTicketExternalTask } from "../../HelpDesk/ExternalTasks/SaveTicket";
import { UpdateTicketExternalTask } from "../../HelpDesk/ExternalTasks/UpdateTicket";
import { NotifyAdminCredentialExternalTask } from "./Task/NotifyAdminCredentials";
import { NotifySupplierCredentialExternalTask } from "./Task/NotifySupplierCredentials";

main();

async function main() {
  // subToOpenTicketForNewSupplier();
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  const messageController = new MessageController();

  // Open ticket
  subManager.subscribeToTopic(
    "open-ticket-new-supplier",
    new OpenTicketExternalTask("new-ticket-message-new-supplier")
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
    new NotifyTicketExternalTask("notify-it-new-supplier-message")
  );

  // Close ticket
  subManager.subscribeToTopic(
    "close-ticket-new-supplier",
    new CloseTicketExternalTask("close-ticket-new-supplier")
  );

  // Notify Ticket Owner
  subManager.subscribeToTopic(
    "notify-owner-new-supplier",
    new NotifyTicketExternalTask("notify-ticket-owner-message-new-supplier")
  );

  // ! NOTIFY SUPPLIER NO MESSAGE
  subManager.subscribeToTopic(
    "notify-supplier-credential",
    new NotifySupplierCredentialExternalTask()
  );

  // ! NOTIFY ADMIN YES MESSAGE
  subManager.subscribeToTopic(
    "notify-admin-new-supplier",
    new NotifyAdminCredentialExternalTask(
      "notify-admin-credential-new-supplier",
      ["supp-user", "supp-pass"]
    )
  );
}
