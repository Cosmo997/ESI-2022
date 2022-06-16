import { IExternalTask } from "../../../../IExternalTask";
import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../../CommunicationManager";

export class NotifyItDeptExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFY IT DEPARTMENT START ------------\n");

    let cm = new CommunicationManager();

    await cm.sendMessage(
      cm.generateMessageDTOAll(
        "delete-employee-notify-it-dept",
        task.businessKey,
        task.variables.getAll()
      )
    );

    await taskService.complete(task);
    console.log("\n------------ NOTIFY IT DEPARTMENT FINISH ------------\n\n");
  }
}
