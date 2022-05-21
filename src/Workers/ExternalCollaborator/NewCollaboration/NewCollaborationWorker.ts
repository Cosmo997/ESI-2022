import { AskInformationsExternalTask } from "./ExternalTasks/AskInformations";
import { CalculateEndDateExternalTask } from "./ExternalTasks/CalculateEndDate";
import { NotifyCredentialsExternalTask } from "./ExternalTasks/NotifyCredentials";
import { SaveCollaboratorInformationsExternalTask } from "./ExternalTasks/SaveCollaboratorInformations";
import { SubManager } from "../../../sub_manager2";
import { ClientManager } from "../../../client";
import { baseUrl } from "../../../config/camunda-config";
import { MessageController } from "../../../APIController/message_controller";
import { OpenTicketExternalTask } from "../../HelpDesk/ExternalTasks/OpenTicket";
import { CloseTicketExternalTask } from "../../HelpDesk/ExternalTasks/CloseTicket";
import { SaveTicketExternalTask } from "../../HelpDesk/ExternalTasks/SaveTicket";
import { UpdateTicketExternalTask } from "../../HelpDesk/ExternalTasks/UpdateTicket";
import { NotifyTicketExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicket";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  const messageController = new MessageController();

  subManager.subscribeToTopic(
    "ask-information",
    new AskInformationsExternalTask(messageController)
  );

  // Open Ticket
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

  // Close Ticket
  subManager.subscribeToTopic(
    "close-ticket",
    new CloseTicketExternalTask(messageController, "close-ticket-message")
  );

  // Save Collaborator Informations
  subManager.subscribeToTopic(
    "save-collaborator-informations",
    new SaveCollaboratorInformationsExternalTask()
  );

  // Calculate End Date
  subManager.subscribeToTopic(
    "calculate-end-date",
    new CalculateEndDateExternalTask()
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
    "notify-it-developer",
    new NotifyTicketExternalTask(messageController, "notify-it-message")
  );

  // Notify Credentials
  subManager.subscribeToTopic(
    "notify-credentials",
    new NotifyCredentialsExternalTask()
  );
}
