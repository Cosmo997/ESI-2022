import { Task, TaskService } from "camunda-external-task-client-js";
import { MessageController } from "../../../../APIController/message_controller";
import { IExternalTask } from "../../../../IExternalTask";

export class NotifyCredentialsExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ NOTIFY CREDENTIALS ------------\n");

    // Notify New Assignment
    // TODO: Email?

    await taskService.complete(task);

    console.log("\n------------ NOTIFY CREDENTIALS TERMINATED------------\n\n");
  }
}
