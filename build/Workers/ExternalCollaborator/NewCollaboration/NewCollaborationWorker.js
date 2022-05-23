"use strict";
// import { AskInformationsExternalTask } from "./ExternalTasks/AskInformations";
// import { CalculateEndDateExternalTask } from "./ExternalTasks/CalculateEndDate";
// import { NotifyCredentialExternalTask } from "./ExternalTasks/NotifyCredentials";
// import { SaveCollaboratorInformationsExternalTask } from "./ExternalTasks/SaveCollaboratorInformations";
// import { SubManager } from "../../../sub_manager";
// import { ClientManager } from "../../../client";
// import { baseUrl } from "../../../config/camunda-config";
// import { MessageController } from "../../../APIController/message_controller";
// import { OpenTicketExternalTask } from "../../HelpDesk/ExternalTasks/OpenTicket";
// import { CloseTicketExternalTask } from "../../HelpDesk/ExternalTasks/CloseTicket";
// import { SaveTicketExternalTask } from "../../HelpDesk/ExternalTasks/SaveTicket";
// import { UpdateTicketExternalTask } from "../../HelpDesk/ExternalTasks/UpdateTicket";
// import { NotifyTicketExternalTask } from "../../HelpDesk/ExternalTasks/NotifyTicket";
// import { startHelpDeskWorker } from "../../HelpDesk/HelpDeskWorker";
// main();
// async function main() {
//   const clientManager = new ClientManager(baseUrl);
//   const subManager = new SubManager(clientManager);
//   const messageController = new MessageController();
//   // Open Ticket
//   subManager.subscribeToTopic(
//     "open-ticket-new-collaborator",
//     new OpenTicketExternalTask(
//       messageController,
//       "open-ticket-message-new-collaborator"
//     )
//   );
//   // Save ticket
//   subManager.subscribeToTopic(
//     "save-ticket-new-collaborator",
//     new SaveTicketExternalTask()
//   );
//   // Update ticket
//   subManager.subscribeToTopic(
//     "update-ticket-new-collaborator",
//     new UpdateTicketExternalTask()
//   );
//   // Close Ticket
//   subManager.subscribeToTopic(
//     "close-ticket-new-collaborator",
//     new CloseTicketExternalTask(
//       messageController,
//       "close-ticket-message-new-collaborator"
//     )
//   );
//   // Notify Ticket Owner
//   subManager.subscribeToTopic(
//     "notify-ticket-owner-new-collaborator",
//     new NotifyCredentialExternalTask(
//       messageController,
//       "notify-ticket-owner-message-new-collaborator"
//     )
//   );
//   // Notify IT
//   subManager.subscribeToTopic(
//     "notify-ticket-it-new-collaborator",
//     new NotifyCredentialExternalTask(
//       messageController,
//       "notify-ticket-it-message-new-collaborator"
//     )
//   );
//   subManager.subscribeToTopic(
//     "ask-information-new-collaborator",
//     new AskInformationsExternalTask(messageController)
//   );
//   // Save Collaborator Informations
//   subManager.subscribeToTopic(
//     "save-collaborator-informations-new-collaborator",
//     new SaveCollaboratorInformationsExternalTask()
//   );
//   // Calculate End Date
//   subManager.subscribeToTopic(
//     "calculate-end-date-new-collaborator",
//     new CalculateEndDateExternalTask()
//   );
//   // Notify Credentials
//   subManager.subscribeToTopic(
//     "notify-credentials-new-collaborator",
//     new NotifyCredentialExternalTask()
//   );
// }
