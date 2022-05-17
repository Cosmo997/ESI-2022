import { subToCloseTicketForTransfer } from "./ExternalTasks/CloseTicket";
import { subToNotifyNewAssignmentsHRDept } from "./ExternalTasks/NotifyHRNewAssingments";
import { subToNotifyItDev } from "./ExternalTasks/NotifyITDev";
import { subToNotifyNewAssignmentsEmployee } from "./ExternalTasks/NotifyNewAssignments";
import { subToNotifyTicketOwner } from "./ExternalTasks/NotifyTicketOwner";
import { subToOpenTicketForTransfer } from "./ExternalTasks/OpenTicket";

main();

async function main() {
  subToOpenTicketForTransfer();
  subToNotifyItDev();
  subToCloseTicketForTransfer();
  subToNotifyTicketOwner();
  subToNotifyNewAssignmentsEmployee();
  subToNotifyNewAssignmentsHRDept();
}
