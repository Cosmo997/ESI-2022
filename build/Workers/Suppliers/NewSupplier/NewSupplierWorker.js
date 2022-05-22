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
const NotifySupplierCredential_1 = require("./Task/NotifySupplierCredential");
main();
async function main() {
    // subToOpenTicketForNewSupplier();
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const subManager = new sub_manager_1.SubManager(clientManager);
    const messageController = new message_controller_1.MessageController();
    // Open ticket
    subManager.subscribeToTopic("open-ticket-new-supplier", new OpenTicket_1.OpenTicketExternalTask(messageController, "new-ticket-message-new-supplier"));
    // Save ticket
    subManager.subscribeToTopic("save-ticket-new-supplier", new SaveTicket_1.SaveTicketExternalTask(messageController));
    // Update ticket
    subManager.subscribeToTopic("update-ticket-new-supplier", new UpdateTicket_1.UpdateTicketExternalTask(messageController));
    // Notify IT
    subManager.subscribeToTopic("notify-it-developer-new-supplier", new NotifyTicket_1.NotifyTicketExternalTask(messageController, "notify-it-new-supplier-message"));
    // Close ticket
    subManager.subscribeToTopic("close-ticket-new-supplier", new CloseTicket_1.CloseTicketExternalTask(messageController, "close-ticket-new-supplier"));
    // Notify
    subManager.subscribeToTopic("notify-admin-new-supplier", new NotifyTicket_1.NotifyTicketExternalTask(messageController, "notify-admin-credential-new-supplier"));
    // Notify Ticket Owner
    subManager.subscribeToTopic("notify-owner-new-supplier", new NotifyTicket_1.NotifyTicketExternalTask(messageController, "notify-ticket-owner-message-new-supplier"));
    (0, NotifySupplierCredential_1.subToNotifySupplierCredentialForNewSupplier)();
}
