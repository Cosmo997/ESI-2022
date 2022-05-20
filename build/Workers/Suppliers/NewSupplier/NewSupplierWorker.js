"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelpDeskWorker_1 = require("../../HelpDesk/HelpDeskWorker");
const NotifySupplierCredential_1 = require("./Task/NotifySupplierCredential");
main();
async function main() {
    // subToOpenTicketForNewSupplier();
    const helpdesk = new HelpDeskWorker_1.HelpDeskWorker();
    helpdesk.ticketSubscription('open-ticket-new-supplier', 'new-ticket-message-new-supplier');
    // Save ticket
    helpdesk.saveTicket('save-ticket-new-supplier');
    // Update ticket
    helpdesk.updateTicket('update-ticket-new-supplier');
    // Notify IT
    helpdesk.ticketSubscription('notify-it-developer-new-supplier', "notify-it-new-supplier-message");
    // Close ticket
    helpdesk.ticketSubscription('close-ticket-new-supplier', 'close-ticket-new-supplier');
    // Notify
    helpdesk.ticketSubscription('notify-admin-new-supplier', 'notify-admin-credential-new-supplier');
    // Notify Ticket Owner
    helpdesk.ticketSubscription('notify-owner-new-supplier', 'notify-ticket-owner-message-new-supplier');
    (0, NotifySupplierCredential_1.subToNotifySupplierCredentialForNewSupplier)();
}
