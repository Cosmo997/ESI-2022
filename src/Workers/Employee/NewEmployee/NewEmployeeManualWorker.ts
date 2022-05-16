import { subToNotifyCredential } from "./NotifyCredential";
import { subToSendEmail } from "./SendEmail";
import { subToSendNewEmployeeInformationServiceTask } from "./SendInfo";

main();

async function main() {
  subToSendNewEmployeeInformationServiceTask();
  subToSendEmail();
  subToNotifyCredential();
}
