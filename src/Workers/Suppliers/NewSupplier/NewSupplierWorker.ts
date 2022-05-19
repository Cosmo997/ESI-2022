import { subToCloseTicketForNewSupplier } from "./Task/CloseTicket";
import { subToNotifyCredentialToAdminForNewSupplier } from "./Task/NotifyAdminCredential";
import { subToNotifyITForNewSupplier } from "./Task/NotifyITDev";
import { subToOpenTicketForNewSupplier } from "./Task/OpenTicket";
import { subToSaveTicketForNewSupplier } from "./Task/SaveTicket";

main();

async function main() {
  subToOpenTicketForNewSupplier();
  subToSaveTicketForNewSupplier();
  subToNotifyITForNewSupplier();
  subToCloseTicketForNewSupplier();
  subToNotifyCredentialToAdminForNewSupplier();
}
