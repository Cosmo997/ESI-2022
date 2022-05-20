import { HelpDeskWorker } from "../../HelpDesk/HelpDeskWorker";


main();

async function main() {

    const helpDeskWorker = new HelpDeskWorker();
    // Open
    helpDeskWorker.ticketSubscription('open-ticket-task-new-customer', 'new-ticket-received-message-new-customer');
    // NotifyItDev
    helpDeskWorker.ticketSubscription('notify-it-developer-task-new-customer', 'new-ticket-created-message-new-customer');
    // Close
    helpDeskWorker.ticketSubscription('close-ticket-task-new-customer', 'recive-closed-ticket-message-new-customer');
    // NotifyOnwer
    helpDeskWorker.ticketSubscription('notify-ticket-owner-new-customer', 'closed-ticket-message-new-customer');
    // NotifyCredential
    helpDeskWorker.ticketSubscription('notify-credential-task-new-customer', 'recive-credential-message-new-customer');
}
