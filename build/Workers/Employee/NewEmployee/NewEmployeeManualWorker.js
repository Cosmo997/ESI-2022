"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotifyCredential_1 = require("./NotifyCredential");
const SendEmail_1 = require("./SendEmail");
const SendInfo_1 = require("./SendInfo");
main();
async function main() {
    (0, SendInfo_1.subToSendNewEmployeeInformationServiceTask)();
    (0, SendEmail_1.sendEmail)();
    (0, NotifyCredential_1.notifyCredential)();
}
