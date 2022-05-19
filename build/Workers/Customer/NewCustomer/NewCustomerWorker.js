"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenTicket_1 = require("../../HelpDesk/OpenTicket");
main();
async function main() {
    // Open
    (0, OpenTicket_1.subToTicket)('open-ticket-task-new-customer', 'new-ticket-received-message-new-customer');
    // NotifyItDev
    (0, OpenTicket_1.subToTicket)('notify-it-developer-task-new-customer', 'new-ticket-created-message-new-customer');
    // Close
    (0, OpenTicket_1.subToTicket)('close-ticket-task-new-customer', 'recive-closed-ticket-message-new-customer');
    // NotifyOnwer
    (0, OpenTicket_1.subToTicket)('notify-ticket-owner-new-customer', 'closed-ticket-message-new-customer');
    (0, OpenTicket_1.subToTicket)('notify-credential-task-new-customer', 'recive-credential-message-new-customer');
    // subToNotifyItDev();
    // subToCloseTicketForNewCustomer();
    // subToUpdateTicketNewCustomer();
    // subToNotifyTicketOwner();
    // subToNotifyCredentialForNewCustomer();
}
