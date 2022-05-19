import { subToOpenTicketNewCustomer } from "./ExternalTasks/OpenTicketNewCustomer";


main();

async function main() {
    subToOpenTicketNewCustomer();
    // subToNotifyItDev();
    // subToCloseTicketForNewCustomer();
    // subToUpdateTicketNewCustomer();
    // subToNotifyTicketOwner();
    // subToNotifyCredentialForNewCustomer();
}
