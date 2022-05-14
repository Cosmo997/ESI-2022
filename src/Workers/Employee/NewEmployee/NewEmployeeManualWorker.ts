import { notifyCredential } from "./NotifyCredential";
import { sendEmail } from "./SendEmail";
import { subToSendNewEmployeeInformationServiceTask } from "./SendInfo";

main();

async function main() {
    subToSendNewEmployeeInformationServiceTask();
    sendEmail();
    notifyCredential();
}



