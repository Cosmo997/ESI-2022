import { MessageController } from "../../../Utils/APIController/message_controller";
import { ClientManager } from "../../../client";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { SubManager } from "../../../SubManager";
import { CloseTicketExternalTask } from "../../HelpDesk/CloseTicket";
import { NotifyTicketITExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicketIT";
import { OpenTicketExternalTask } from "../../HelpDesk/OpenTicket";
import { SaveTicketExternalTask } from "../../HelpDesk/ExternalTasks/SaveTicket";
import { UpdateTicketExternalTask } from "../../HelpDesk/ExternalTasks/UpdateTicket";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  const messageController = new MessageController();

  // Open ticket
  subManager.subscribeToTopic(
    "open-ticket-task-new-customer",
    new OpenTicketExternalTask("new-ticket-received-message-new-customer")
  );

  // Save ticket
  subManager.subscribeToTopic("save-ticket", new SaveTicketExternalTask());

  // Update ticket
  subManager.subscribeToTopic("update-ticket", new UpdateTicketExternalTask());

  // Notify IT
  subManager.subscribeToTopic(
    "notify-it-developer-task-new-customer",
    new NotifyTicketITExternalTask("new-ticket-created-message-new-customer")
  );

  // Close ticket
  subManager.subscribeToTopic(
    "close-ticket-task-new-customer",
    new CloseTicketExternalTask("recive-closed-ticket-message-new-customer")
  );

  // Notify Credentials
  subManager.subscribeToTopic(
    "notify-credential-task-new-customer",
    new NotifyTicketITExternalTask("recive-credential-message-new-customer")
  );

  // Notify Ticket Owner
  subManager.subscribeToTopic(
    "notify-ticket-owner-new-customer",
    new NotifyTicketITExternalTask("closed-ticket-message-new-customer")
  );
}
