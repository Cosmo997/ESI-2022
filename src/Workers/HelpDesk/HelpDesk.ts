import { ClientManager } from "../../client";
import { SubManager } from "../../SubManager";
import { baseUrl } from "../../Utils/config/camunda-config";
import { NotifyTicketITExternalTask } from "./ExternalTasks/NotifyTicketIT";
import { NotifyTicketOwnerExternalTask } from "./ExternalTasks/NotifyTicketOwner";
import { SaveTicketExternalTask } from "./ExternalTasks/SaveTicket";
import { UpdateTicketExternalTask } from "./ExternalTasks/UpdateTicket";

export async function helpDeskStart(messageIT: string, messageOwner: string) {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  // * SAVE TICKET
  subManager.subscribeToTopic("save-ticket", new SaveTicketExternalTask());

  // * NOTIFY IT
  subManager.subscribeToTopic(
    "notify-it-developer",
    new NotifyTicketITExternalTask(messageIT)
  );

  // * UPDATE TICKET
  subManager.subscribeToTopic("update-ticket", new UpdateTicketExternalTask());

  // * NOTIFY TICKET OWNER
  subManager.subscribeToTopic(
    "notify-ticket-owner",
    new NotifyTicketOwnerExternalTask(messageOwner)
  );
}
