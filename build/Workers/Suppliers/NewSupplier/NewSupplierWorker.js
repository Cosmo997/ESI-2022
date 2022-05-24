"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_controller_1 = require("../../../APIController/message_controller");
const client_1 = require("../../../client");
const camunda_config_1 = require("../../../config/camunda-config");
const SubManager_1 = require("../../../SubManager");
const CloseTicket_1 = require("../../HelpDesk/ExternalTasks/CloseTicket");
const NotifyTicket_1 = require("../../HelpDesk/ExternalTasks/NotifyTicket");
const OpenTicket_1 = require("../../HelpDesk/ExternalTasks/OpenTicket");
const SaveTicket_1 = require("../../HelpDesk/ExternalTasks/SaveTicket");
const UpdateTicket_1 = require("../../HelpDesk/ExternalTasks/UpdateTicket");
const NotifyAdminCredentials_1 = require("./Task/NotifyAdminCredentials");
const NotifySupplierCredentials_1 = require("./Task/NotifySupplierCredentials");
main();
async function main() {
    // subToOpenTicketForNewSupplier();
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const subManager = new SubManager_1.SubManager(clientManager);
    const messageController = new message_controller_1.MessageController();
    // Open ticket
    subManager.subscribeToTopic("open-ticket-new-supplier", new OpenTicket_1.OpenTicketExternalTask("new-ticket-message-new-supplier"));
    // Save ticket
    subManager.subscribeToTopic("save-ticket-new-supplier", new SaveTicket_1.SaveTicketExternalTask());
    // Update ticket
    subManager.subscribeToTopic("update-ticket-new-supplier", new UpdateTicket_1.UpdateTicketExternalTask());
    // Notify IT
    subManager.subscribeToTopic("notify-it-developer-new-supplier", new NotifyTicket_1.NotifyTicketExternalTask("notify-it-new-supplier-message"));
    // Close ticket
    subManager.subscribeToTopic("close-ticket-new-supplier", new CloseTicket_1.CloseTicketExternalTask("close-ticket-new-supplier"));
    // Notify Ticket Owner
    subManager.subscribeToTopic("notify-owner-new-supplier", new NotifyTicket_1.NotifyTicketExternalTask("notify-ticket-owner-message-new-supplier"));
    // ! NOTIFY SUPPLIER NO MESSAGE
    subManager.subscribeToTopic("notify-supplier-credential", new NotifySupplierCredentials_1.NotifySupplierCredentialExternalTask());
    // ! NOTIFY ADMIN YES MESSAGE
    subManager.subscribeToTopic("notify-admin-new-supplier", new NotifyAdminCredentials_1.NotifyAdminCredentialExternalTask("notify-admin-credential-new-supplier", ["supp-user", "supp-pass"]));
}
