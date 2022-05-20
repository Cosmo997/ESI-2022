"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AskInformations_1 = require("./ExternalTasks/AskInformations");
const CalculateEndDate_1 = require("./ExternalTasks/CalculateEndDate");
const CloseTicket_1 = require("./ExternalTasks/CloseTicket");
const NotifyCredentials_1 = require("./ExternalTasks/NotifyCredentials");
const NotifyITDev_1 = require("./ExternalTasks/NotifyITDev");
const NotifyTicketOwner_1 = require("./ExternalTasks/NotifyTicketOwner");
const OpenTicket_1 = require("./ExternalTasks/OpenTicket");
const SaveTicket_1 = require("./ExternalTasks/SaveTicket");
const UpdateTicket_1 = require("./ExternalTasks/UpdateTicket");
const SaveCollaboratorInformations_1 = require("./ExternalTasks/SaveCollaboratorInformations");
main();
async function main() {
    (0, OpenTicket_1.subToOpenTicket)();
    (0, UpdateTicket_1.subToUpdateTicket)();
    (0, SaveTicket_1.subToSaveTicket)();
    (0, CloseTicket_1.subToCloseTicket)();
    (0, AskInformations_1.subToAskInformations)();
    (0, SaveCollaboratorInformations_1.subToSaveCollaboratorInformations)();
    (0, CalculateEndDate_1.subToCalculateEndDate)();
    (0, NotifyITDev_1.subToNotifyItDev)();
    (0, NotifyTicketOwner_1.subToNotifyTicketOwner)();
    (0, NotifyCredentials_1.subToNotifyCredentials)();
}
