import { AskInformationsExternalTask } from "./ExternalTasks/AskInformations";
import { subToCalculateEndDate } from "./ExternalTasks/CalculateEndDate";
import { subToCloseTicket } from "./ExternalTasks/CloseTicket";
import { subToNotifyCredentials } from "./ExternalTasks/NotifyCredentials";
import { subToNotifyItDev } from "./ExternalTasks/NotifyITDev";
import { subToNotifyTicketOwner } from "./ExternalTasks/NotifyTicketOwner";
import { subToOpenTicket } from "./ExternalTasks/OpenTicket";
import { subToSaveTicket } from "./ExternalTasks/SaveTicket";
import { subToUpdateTicket } from "./ExternalTasks/UpdateTicket";
import { subToSaveCollaboratorInformations } from "./ExternalTasks/SaveCollaboratorInformations";
import { SubManager } from "../../../sub_manager2";
import { ClientManager } from "../../../client";
import { baseUrl } from "../../../config/camunda-config";
import { MessageController } from "../../../APIController/message_controller";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  const messageController = new MessageController();

  subManager.subscribeToTopic(
    "ask-information",
    new AskInformationsExternalTask(messageController)
  );

  subToOpenTicket();
  subToUpdateTicket();
  subToSaveTicket();
  subToCloseTicket();

  subToSaveCollaboratorInformations();
  subToCalculateEndDate();

  subToNotifyItDev();
  subToNotifyTicketOwner();
  subToNotifyCredentials();
}
