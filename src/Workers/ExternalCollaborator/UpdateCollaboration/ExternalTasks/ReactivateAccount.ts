import { Task, TaskService } from "camunda-external-task-client-js";
import { IExternalTask } from "../../../../IExternalTask";
export class ReactivateAccount implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ START REACTIVATE ACCOUNT ------------\n");

    // Prendo nuova end date e user id dalle process variable
    // Prendo nuova end date e user id dalle process variable
    console.log("\n\n" + task.variables.getAll() + "\n\n");
    const userId = task.variables.get("user_id_key");
    const operationType = task.variables.get("operation_type");
    console.log(
      `\n\n USER_ID: ${userId} \n OPERATION_TYPE: ${operationType} \n\n `
    );
    // Aggiorno end date dell'user con id preso e setto stato a 'Active'

    await taskService.complete(task, task.variables);
    console.log("\n\n------------ END REACTIVATE ACCOUNT ------------\n");
  }
}
