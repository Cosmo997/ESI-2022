"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AskInformations_1 = require("./ExternalTasks/AskInformations");
const CalculateEndDate_1 = require("./ExternalTasks/CalculateEndDate");
const NotifyCredentials_1 = require("./ExternalTasks/NotifyCredentials");
const SaveCollaboratorInformations_1 = require("./ExternalTasks/SaveCollaboratorInformations");
const sub_manager_1 = require("../../../sub_manager");
const client_1 = require("../../../client");
const camunda_config_1 = require("../../../config/camunda-config");
const message_controller_1 = require("../../../APIController/message_controller");
const OpenTicket_1 = require("../../HelpDesk/ExternalTasks/OpenTicket");
const CloseTicket_1 = require("../../HelpDesk/ExternalTasks/CloseTicket");
const SaveTicket_1 = require("../../HelpDesk/ExternalTasks/SaveTicket");
const UpdateTicket_1 = require("../../HelpDesk/ExternalTasks/UpdateTicket");
const NotifyTicket_1 = require("../../HelpDesk/ExternalTasks/NotifyTicket");
main();
async function main() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const subManager = new sub_manager_1.SubManager(clientManager);
    const messageController = new message_controller_1.MessageController();
    // Open Ticket
    subManager.subscribeToTopic("open-ticket-new-collaborator", new OpenTicket_1.OpenTicketExternalTask(messageController, "open-ticket-message-new-collaborator"));
    // Save ticket
    subManager.subscribeToTopic("save-ticket-new-collaborator", new SaveTicket_1.SaveTicketExternalTask(messageController));
    // Update ticket
    subManager.subscribeToTopic("update-ticket-new-collaborator", new UpdateTicket_1.UpdateTicketExternalTask(messageController));
    // Close Ticket
    subManager.subscribeToTopic("close-ticket-new-collaborator", new CloseTicket_1.CloseTicketExternalTask(messageController, "close-ticket-message-new-collaborator"));
    // Notify Ticket Owner
    subManager.subscribeToTopic("notify-ticket-owner-new-collaborator", new NotifyTicket_1.NotifyTicketExternalTask(messageController, "notify-ticket-owner-message-new-collaborator"));
    // Notify IT
    subManager.subscribeToTopic("notify-ticket-it-new-collaborator", new NotifyTicket_1.NotifyTicketExternalTask(messageController, "notify-ticket-it-message-new-collaborator"));
    subManager.subscribeToTopic("ask-information-new-collaborator", new AskInformations_1.AskInformationsExternalTask(messageController));
    // Save Collaborator Informations
    subManager.subscribeToTopic("save-collaborator-informations-new-collaborator", new SaveCollaboratorInformations_1.SaveCollaboratorInformationsExternalTask());
    // Calculate End Date
    subManager.subscribeToTopic("calculate-end-date-new-collaborator", new CalculateEndDate_1.CalculateEndDateExternalTask());
    // Notify Credentials
    subManager.subscribeToTopic("notify-credentials-new-collaborator", new NotifyCredentials_1.NotifyCredentialsExternalTask());
}
