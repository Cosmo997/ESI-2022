import { Task, TaskService } from "camunda-external-task-client-js";
import { ClientManager } from "../../../client";
import { usersSchema } from "../../../Database/DbPath";
import { userManagmentSystemDB } from "../../../Database/DbRepoInstance";
import { GenericDbService } from "../../../Database/service/generic_db_service";
import { IExternalTask } from "../../../IExternalTask";
import { SubManager } from "../../../SubManager";
import { baseUrl } from "../../../Utils/config/camunda-config";
import { CloseTicketExternalTask } from "../../HelpDesk/CloseTicket";
import { helpDeskStart } from "../../HelpDesk/HelpDesk";
import { OpenTicketExternalTask } from "../../HelpDesk/OpenTicket";
import { CalculateEndDateExternalTask } from "./ExternalTasks/CalculateEndDate";
import { NotifyCollaboratorCredentialsExternalTask } from "./ExternalTasks/NotifyCollaboratoCredentials";
import { SaveNewCollaborationExternalTask } from "./ExternalTasks/SaveInformation";

export class DeleteCollabExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ DELETE COLLAB START ------------\n");

    console.log("\nVARIABLES:" + task.variables.getAll());

    console.log("\n\n------------ DELETE COLLAB END ------------\n");
    await taskService.complete(task);
  }
}

main();

async function main() {
  const clientManager = new ClientManager(baseUrl);
  const subManager = new SubManager(clientManager);

  const dbService = new GenericDbService(userManagmentSystemDB, usersSchema);

  helpDeskStart({
    messageTo: "notify-ticket-it-message-new-collaborator",
    messageOwner: "notify-ticket-owner-message-new-collaborator",
  });

  // Open Ticket
  subManager.subscribeToTopic(
    "open-ticket-new-collaborator",
    new OpenTicketExternalTask()
  );

  // Calculate End Date
  subManager.subscribeToTopic(
    "calculate-end-date-new-collaborator",
    new CalculateEndDateExternalTask(dbService)
  );

  // Save information
  subManager.subscribeToTopic(
    "save-information",
    new SaveNewCollaborationExternalTask()
  );

  // Close Ticket
  subManager.subscribeToTopic(
    "close-ticket-new-collaborator",
    new CloseTicketExternalTask()
  );

  // Notify Credentials
  subManager.subscribeToTopic(
    "notify-credentials-new-collaborator",
    new NotifyCollaboratorCredentialsExternalTask()
  );

  // Account expired
  subManager.subscribeToTopic("delete-collab", new DeleteCollabExternalTask());
}
