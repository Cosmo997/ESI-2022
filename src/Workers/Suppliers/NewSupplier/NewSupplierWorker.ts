import { ClientManager } from "../../../client";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { SubManager } from "../../../SubManager";
import { CloseTicketExternalTask } from "../../HelpDesk/CloseTicket";
import { OpenTicketExternalTask } from "../../HelpDesk/OpenTicket";
import { NotifyAdminCredentialExternalTask } from "./Task/NotifyAdminCredentials";
import { NotifySupplierCredentialExternalTask } from "./Task/NotifySupplierCredentials";
import { helpDeskStart } from "../../HelpDesk/HelpDesk";

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  helpDeskStart({
    messageTo: "notify-it-new-supplier-message",
    messageOwner: "notify-ticket-owner-message-new-supplier",
  });

  // Open ticket
  subManager.subscribeToTopic(
    "open-ticket-new-supplier",
    new OpenTicketExternalTask()
  );

  // Close ticket
  subManager.subscribeToTopic(
    "close-ticket-new-supplier",
    new CloseTicketExternalTask()
  );

  // ! NOTIFY SUPPLIER NO MESSAGE
  subManager.subscribeToTopic(
    "notify-supplier-credential",
    new NotifySupplierCredentialExternalTask()
  );

  // ! NOTIFY ADMIN YES MESSAGE
  subManager.subscribeToTopic(
    "notify-admin-new-supplier",
    new NotifyAdminCredentialExternalTask(
      "notify-admin-credential-new-supplier",
      ["supp-user", "supp-pass"]
    )
  );
}
