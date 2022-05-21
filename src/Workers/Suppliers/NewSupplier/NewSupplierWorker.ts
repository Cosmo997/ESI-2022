import { HelpDeskWorker } from "../../HelpDesk/HelpDeskWorker";
import { subToNotifySupplierCredentialForNewSupplier } from "./Task/NotifySupplierCredential";

main();

async function main() {
  // subToOpenTicketForNewSupplier();
  const helpdesk = new HelpDeskWorker();
  
  helpdesk.openTicket('open-ticket-new-supplier','new-ticket-message-new-supplier');
  // Save ticket
  helpdesk.saveTicket('save-ticket-new-supplier');
  // Update ticket
  helpdesk.updateTicket('update-ticket-new-supplier');

  // Notify IT
  helpdesk.notifyTicket('notify-it-developer-new-supplier', "notify-it-new-supplier-message");
  
  // Close ticket
  helpdesk.closeTicket('close-ticket-new-supplier', 'close-ticket-new-supplier');
  
  // Notify
  helpdesk.notifyTicket('notify-admin-new-supplier','notify-admin-credential-new-supplier');

  // Notify Ticket Owner
  helpdesk.notifyTicket('notify-owner-new-supplier','notify-ticket-owner-message-new-supplier');

  subToNotifySupplierCredentialForNewSupplier();


}
