import { IExternalTask } from "../../../../IExternalTask";
import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../../CommunicationManager";

export class SendEmailExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ SEND EMAIL CREDENTIAL START ------------\n");

    let cm = new CommunicationManager();

    await cm.sendMessage(
      cm.generateMessageDTOAll(
        "email-new-employee",
        task.businessKey,
        task.variables.getAll()
      )
    );

    await taskService.complete(task);
    console.log("\n------------SEND EMAIL CREDENTIAL FINISH ------------\n\n");
  }
}
