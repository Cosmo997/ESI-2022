import { ClientManager } from "../../../client";
import { usersSchema } from "../../../Database/DbPath";
import { userManagmentSystemDB } from "../../../Database/DbRepoInstance";
import { GenericDbService } from "../../../Database/service/generic_db_service";
import { SubManager } from "../../../SubManager";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { CloseTicketExternalTask } from "../../HelpDesk/CloseTicket";
import { helpDeskStart } from "../../HelpDesk/HelpDesk";
import { OpenTicketExternalTask } from "../../HelpDesk/OpenTicket";
import { DeactiveAccountExternalTask } from "../../DeactiveAccount";
import { CalculateEndDateExternalTask } from "./ExternalTasks/CalculateEndDate";
import { NotifyCollaboratorCredentialsExternalTask } from "./ExternalTasks/NotifyCollaboratoCredentials";
import { SaveNewCollaborationExternalTask } from "./ExternalTasks/SaveInformation";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  const dbService = new GenericDbService(userManagmentSystemDB, usersSchema);

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
    new CalculateEndDateExternalTask(dbService)
  );

  // Save information
  subManager.subscribeToTopic(
    "save-information",
    new SaveNewCollaborationExternalTask()
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

  // Account expired
  subManager.subscribeToTopic(
    "deactive-account",
    new DeactiveAccountExternalTask(dbService)
  );
}
