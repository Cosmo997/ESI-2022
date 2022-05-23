"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_controller_1 = require("../../../APIController/message_controller");
const client_1 = require("../../../client");
const camunda_config_1 = require("../../../config/camunda-config");
const sub_manager_1 = require("../../../sub_manager");
const CloseTicket_1 = require("../../HelpDesk/ExternalTasks/CloseTicket");
const NotifyTicket_1 = require("../../HelpDesk/ExternalTasks/NotifyTicket");
const OpenTicket_1 = require("../../HelpDesk/ExternalTasks/OpenTicket");
const SaveTicket_1 = require("../../HelpDesk/ExternalTasks/SaveTicket");
const UpdateTicket_1 = require("../../HelpDesk/ExternalTasks/UpdateTicket");
main();
async function main() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const subManager = new sub_manager_1.SubManager(clientManager);
    const messageController = new message_controller_1.MessageController();
    // Open ticket
    subManager.subscribeToTopic("open-ticket-task-new-customer", new OpenTicket_1.OpenTicketExternalTask(messageController, "new-ticket-received-message-new-customer"));
    // Save ticket
    subManager.subscribeToTopic("save-ticket", new SaveTicket_1.SaveTicketExternalTask());
    // Update ticket
    subManager.subscribeToTopic("update-ticket", new UpdateTicket_1.UpdateTicketExternalTask());
    // Notify IT
    subManager.subscribeToTopic("notify-it-developer-task-new-customer", new NotifyTicket_1.NotifyTicketExternalTask(messageController, "new-ticket-created-message-new-customer"));
    // Close ticket
    subManager.subscribeToTopic("close-ticket-task-new-customer", new CloseTicket_1.CloseTicketExternalTask(messageController, "recive-closed-ticket-message-new-customer"));
    // Notify Credentials
    subManager.subscribeToTopic("notify-credential-task-new-customer", new NotifyTicket_1.NotifyTicketExternalTask(messageController, "recive-credential-message-new-customer"));
    // Notify Ticket Owner
    subManager.subscribeToTopic("notify-ticket-owner-new-customer", new NotifyTicket_1.NotifyTicketExternalTask(messageController, "closed-ticket-message-new-customer"));
}
