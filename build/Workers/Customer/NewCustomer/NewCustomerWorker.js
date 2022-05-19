"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenTicketNewCustomer_1 = require("./ExternalTasks/OpenTicketNewCustomer");
const SaveTicketNewCustomer_1 = require("./ExternalTasks/SaveTicketNewCustomer");
main();
async function main() {
    (0, OpenTicketNewCustomer_1.subToOpenTicketNewCustomer)();
    (0, SaveTicketNewCustomer_1.subSubSaveTicketNewCustomer)();
    // subToNotifyItDev();
    // subToCloseTicketForNewCustomer();
    // subToUpdateTicketNewCustomer();
    // subToNotifyTicketOwner();
    // subToNotifyCredentialForNewCustomer();
}
