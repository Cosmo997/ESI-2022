import { subToAskInformations } from "./ExternalTasks/AskInformations";
import { subToCalculateEndDate } from "./ExternalTasks/CalculateEndDate";
import { subToCloseTicket } from "./ExternalTasks/CloseTicket";
import { subToNotifyCredentials } from "./ExternalTasks/NotifyCredentials";
import { subToNotifyItDev } from "./ExternalTasks/NotifyITDev";
import { subToNotifyTicketOwner } from "./ExternalTasks/NotifyTicketOwner";
import { subToOpenTicket } from "./ExternalTasks/OpenTicket";
import { subToSaveTicket } from "./ExternalTasks/SaveTicket";
import { subToUpdateTicket } from "./ExternalTasks/UpdateTicket";
import { subToSaveCollaboratorInformations } from "./ExternalTasks/SaveCollaboratorInformations";

main();

async function main() {
  subToOpenTicket();
  subToUpdateTicket();
  subToSaveTicket();
  subToCloseTicket();

  subToAskInformations();

  subToSaveCollaboratorInformations();
  subToCalculateEndDate();

  subToNotifyItDev();
  subToNotifyTicketOwner();
  subToNotifyCredentials();
}
