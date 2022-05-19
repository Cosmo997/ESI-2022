import { subToTicket } from "../../HelpDesk/OpenTicket";


main();

async function main() {
    // Open
    subToTicket('open-ticket-task-new-customer', 'new-ticket-received-message-new-customer');
    // NotifyItDev
    subToTicket('notify-it-developer-task-new-customer', 'new-ticket-created-message-new-customer');
    // Close
    subToTicket('close-ticket-task-new-customer', 'recive-closed-ticket-message-new-customer');
    // NotifyOnwer
    subToTicket('notify-ticket-owner-new-customer', 'closed-ticket-message-new-customer');

    subToTicket('notify-credential-task-new-customer', 'recive-credential-message-new-customer');
    // subToNotifyItDev();
    // subToCloseTicketForNewCustomer();
    // subToUpdateTicketNewCustomer();
    // subToNotifyTicketOwner();
    // subToNotifyCredentialForNewCustomer();
}
