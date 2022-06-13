import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { ClientManager } from "../../../client";
import { IExternalTask } from "../../../IExternalTask";
import { SubManager } from "../../../SubManager";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { CloseTicketExternalTask } from "../../HelpDesk/CloseTicket";
import { helpDeskStart } from "../../HelpDesk/HelpDesk";
import { OpenTicketExternalTask } from "../../HelpDesk/OpenTicket";
import { GenericDbService } from "../../../Database/service/generic_db_service";
import { userManagmentSystemDB } from "../../../Database/DbRepoInstance";
import { usersSchema } from "../../../Database/DbPath";
import { ExtendEndDate } from "./ExternalTasks/ExtendEndDate";
import { ReactivateAccount } from "./ExternalTasks/ReactivateAccount";

main();

function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  const dbService = new GenericDbService(userManagmentSystemDB, usersSchema);

  helpDeskStart({
    messageTo: "it-department",
    messageOwner: "dept-mgrs",
  });

  subManager.subscribeToTopic("open-ticket", new OpenTicketExternalTask());
  subManager.subscribeToTopic("close-ticket", new CloseTicketExternalTask());

  subManager.subscribeToTopic("extend-end-date", new ExtendEndDate(dbService));

  subManager.subscribeToTopic(
    "reactivate-account",
    new ReactivateAccount(dbService)
  );
}
