"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CloseTicket_1 = require("./Task/CloseTicket");
const NotifyAdminCredential_1 = require("./Task/NotifyAdminCredential");
const NotifyITDev_1 = require("./Task/NotifyITDev");
const OpenTicket_1 = require("./Task/OpenTicket");
const SaveTicket_1 = require("./Task/SaveTicket");
main();
async function main() {
    (0, OpenTicket_1.subToOpenTicketForNewSupplier)();
    (0, SaveTicket_1.subToSaveTicketForNewSupplier)();
    (0, NotifyITDev_1.subToNotifyITForNewSupplier)();
    (0, CloseTicket_1.subToCloseTicketForNewSupplier)();
    (0, NotifyAdminCredential_1.subToNotifyCredentialToAdminForNewSupplier)();
}
