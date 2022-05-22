import { MessageController } from "../../APIController/message_controller";
import { ClientManager } from "../../client";
import { baseUrl } from "../../config/camunda-config";
import { SubManager } from "../../sub_manager";
import { CloseTicketExternalTask } from "../HelpDesk/ExternalTasks/CloseTicket";
import { NotifyTicketExternalTask } from "../HelpDesk/ExternalTasks/NotifyTicket";
import { OpenTicketExternalTask } from "../HelpDesk/ExternalTasks/OpenTicket";
import { SaveTicketExternalTask } from "../HelpDesk/ExternalTasks/SaveTicket";
import { UpdateTicketExternalTask } from "../HelpDesk/ExternalTasks/UpdateTicket";

export async function startHelpDeskWorker() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  const messageController = new MessageController();

  // Open ticket
  subManager.subscribeToTopic(
    "open-ticket",
    new OpenTicketExternalTask(messageController, "open-ticket-message")
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

  // Close ticket
  subManager.subscribeToTopic(
    "close-ticket",
    new CloseTicketExternalTask(messageController, "close-ticket-message")
  );

  // Notify Ticket Owner
  subManager.subscribeToTopic(
    "notify-ticket-owner",
    new NotifyTicketExternalTask(
      messageController,
      "notify-ticket-owner-message"
    )
  );

  // Notify IT
  subManager.subscribeToTopic(
    "notify-ticket-it",
    new NotifyTicketExternalTask(messageController, "notify-ticket-it-message")
  );
}
