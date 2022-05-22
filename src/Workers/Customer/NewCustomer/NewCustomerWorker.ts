import { MessageController } from "../../../APIController/message_controller";
import { ClientManager } from "../../../client";
import { baseUrl } from "../../../config/camunda-config";
import { SubManager } from "../../../sub_manager";
import { CloseTicketExternalTask } from "../../HelpDesk/ExternalTasks/CloseTicket";
import { NotifyTicketExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicket";
import { OpenTicketExternalTask } from "../../HelpDesk/ExternalTasks/OpenTicket";
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
    new OpenTicketExternalTask(
      messageController,
      "new-ticket-received-message-new-customer"
    )
  );

  // Save ticket
  subManager.subscribeToTopic(
    "save-ticket",
    new SaveTicketExternalTask(messageController)
  );

  // Update ticket
  subManager.subscribeToTopic(
    "update-ticket",
    new UpdateTicketExternalTask(messageController)
  );

  // Notify IT
  subManager.subscribeToTopic(
    "notify-it-developer-task-new-customer",
    new NotifyTicketExternalTask(
      messageController,
      "new-ticket-created-message-new-customer"
    )
  );

  // Close ticket
  subManager.subscribeToTopic(
    "close-ticket-task-new-customer",
    new CloseTicketExternalTask(
      messageController,
      "recive-closed-ticket-message-new-customer"
    )
  );

  // Notify Credentials
  subManager.subscribeToTopic(
    "notify-credential-task-new-customer",
    new NotifyTicketExternalTask(
      messageController,
      "recive-credential-message-new-customer"
    )
  );

  // Notify Ticket Owner
  subManager.subscribeToTopic(
    "notify-ticket-owner-new-customer",
    new NotifyTicketExternalTask(
      messageController,
      "closed-ticket-message-new-customer"
    )
  );
}
