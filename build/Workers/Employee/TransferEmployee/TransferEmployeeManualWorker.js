"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CloseTicket_1 = require("./ExternalTasks/CloseTicket");
const NotifyHRNewAssingments_1 = require("./ExternalTasks/NotifyHRNewAssingments");
const NotifyITDev_1 = require("./ExternalTasks/NotifyITDev");
const NotifyNewAssignments_1 = require("./ExternalTasks/NotifyNewAssignments");
const NotifyTicketOwner_1 = require("./ExternalTasks/NotifyTicketOwner");
const OpenTicket_1 = require("./ExternalTasks/OpenTicket");
main();
async function main() {
    (0, OpenTicket_1.subToOpenTicketForTransfer)();
    (0, NotifyITDev_1.subToNotifyItDev)();
    (0, CloseTicket_1.subToCloseTicketForTransfer)();
    (0, NotifyTicketOwner_1.subToNotifyTicketOwner)();
    (0, NotifyNewAssignments_1.subToNotifyNewAssignmentsEmployee)();
    (0, NotifyHRNewAssingments_1.subToNotifyNewAssignmentsHRDept)();
}
