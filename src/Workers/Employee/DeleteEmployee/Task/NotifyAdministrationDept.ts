import { IExternalTask } from "../../../../IExternalTask";
import { Task, TaskService } from "camunda-external-task-client-js";
import { CommunicationManager } from "../../../../CommunicationManager";

export class NotifyAdministrationDeptExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log(
      "\n\n------------ NOTIFY ADMINISTRATION DEPARTMENT START ------------\n"
    );

    let cm = new CommunicationManager();

    await cm.sendMessage(
      cm.generateMessageDTOAll(
        "delete-employee-notify-admin-dept",
        task.businessKey,
        task.variables.getAll()
      )
    );

    await taskService.complete(task);
    console.log(
      "\n------------ NOTIFY ADMINISTRATION DEPARTMENT FINISH ------------\n\n"
    );
  }
}
