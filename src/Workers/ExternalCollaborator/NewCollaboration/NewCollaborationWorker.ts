import { ClientManager } from "../../../client";
import { SubManager } from "../../../SubManager";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { CloseTicketExternalTask } from "../../HelpDesk/CloseTicket";
import { helpDeskStart } from "../../HelpDesk/HelpDesk";
import { OpenTicketExternalTask } from "../../HelpDesk/OpenTicket";
import { CalculateEndDateExternalTask } from "./ExternalTasks/CalculateEndDate";
import { NotifyCollaboratorCredentialsExternalTask } from "./ExternalTasks/NotifyCollaboratoCredentials";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  helpDeskStart({
    messageTo: "notify-ticket-it-message-new-collaborator",
    messageOwner: "notify-ticket-owner-message-new-collaborator",
  });

  // Open Ticket
  subManager.subscribeToTopic(
    "open-ticket-new-collaborator",
    new OpenTicketExternalTask()
  );

  // Calculate End Date
  subManager.subscribeToTopic(
    "calculate-end-date-new-collaborator",
    new CalculateEndDateExternalTask()
  );

  // Close Ticket
  subManager.subscribeToTopic(
    "close-ticket-new-collaborator",
    new CloseTicketExternalTask()
  );

  // Notify Credentials
  subManager.subscribeToTopic(
    "notify-credentials-new-collaborator",
    new NotifyCollaboratorCredentialsExternalTask()
  );
}
