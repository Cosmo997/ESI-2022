import { Task, TaskService } from "camunda-external-task-client-js";

export interface IExternalTask {
  execute(task: Task, taskService: TaskService): Promise<void>;
}
