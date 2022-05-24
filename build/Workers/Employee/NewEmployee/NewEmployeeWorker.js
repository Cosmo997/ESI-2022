"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../../client");
const camunda_config_1 = require("../../../config/camunda-config");
const SubManager_1 = require("../../../SubManager");
const NotifyCredential_1 = require("./Task/NotifyCredential");
const SendEmail_1 = require("./Task/SendEmail");
const SendInfo_1 = require("./Task/SendInfo");
main();
async function main() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const subManager = new SubManager_1.SubManager(clientManager);
    subManager.subscribeToTopic("send-info-new-employee", new SendInfo_1.SendInfoExternalTask());
    subManager.subscribeToTopic("send-email-new-employee", new SendEmail_1.SendEmailExternalTask());
    subManager.subscribeToTopic("notify-credential-new-employee", new NotifyCredential_1.NotifyCredentialExternalTask());
}
