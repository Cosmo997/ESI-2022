import { ClientManager } from "../../../client";
import { SubManager } from "../../../SubManager";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { CloseTicketExternalTask } from "../../HelpDesk/CloseTicket";
import { NotifyTicketITExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicketIT";
import { NotifyTicketOwnerExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicketOwner";
import { SaveTicketExternalTask } from "../../HelpDesk/ExternalTasks/SaveTicket";
import { UpdateTicketExternalTask } from "../../HelpDesk/ExternalTasks/UpdateTicket";
import { helpDeskStart } from "../../HelpDesk/HelpDesk";
import { OpenTicketExternalTask } from "../../HelpDesk/OpenTicket";
import { NotifyEmployeeExternalTask } from "./ExternalTasks/NotifyEmployee";
import { NotifyHRExternalTask } from "./ExternalTasks/NotifyHR";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  helpDeskStart(
    "notify-it-transfer-employee",
    "transfer-employee-ticket-closed"
  );

  // * OPEN TICKET
  subManager.subscribeToTopic(
    "open-ticket-transfer-employee",
    new OpenTicketExternalTask()
  );

  // * CLOSE TICKET
  subManager.subscribeToTopic(
    "close-ticket-transfer-employee",
    new CloseTicketExternalTask()
  );

  // * NOTIFY EMPLOYEE
  subManager.subscribeToTopic(
    "notify-new-assignments-employee",
    new NotifyEmployeeExternalTask()
  );

  // * NOTIFY HR
  subManager.subscribeToTopic(
    "notify-new-assignments-hrdept",
    new NotifyHRExternalTask("notify-hrdept-message")
  );
}
