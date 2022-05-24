import { IExternalTask } from "../../../../IExternalTask";
import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../../CommunicationManager";

export class SendInfoExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ SEND EMPLOYEE INFO START ------------\n");

    const cm = new CommunicationManager();

    await cm.sendMessage(
      cm.generateMessageDTOAll(
        "info-new-employee",
        task.businessKey,
        task.variables.getAll()
      )
    );

    await taskService.complete(task);
    console.log("\n------------SEND EMPLOYEE INFO FINISH ------------\n\n");
  }
}
