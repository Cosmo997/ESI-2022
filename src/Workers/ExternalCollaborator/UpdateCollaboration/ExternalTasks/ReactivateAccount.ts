import { Task, TaskService } from "camunda-external-task-client-js";
import { GenericDbService } from "../../../../Database/service/generic_db_service";
import { UserDbService } from "../../../../Database/service/user_db_service";
import { IExternalTask } from "../../../../IExternalTask";
import { LoccioniUser } from "../../../../Model/User";
export class ReactivateAccount implements IExternalTask {
  dbService: UserDbService;
  constructor(dbService: UserDbService) {
    this.dbService = dbService;
  }
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ START REACTIVATE ACCOUNT ------------\n");

    // Prendo nuova end date e user id dalle process variable
    console.log("\n\n" + task.variables.getAll() + "\n\n");
    const userId = task.variables.get("user_id_key");
    const operationType = task.variables.get("operation_type");
    const newEndDate = task.variables.get("new_end_date");

    console.log(
      `\n\n USER_ID: ${userId} \n OPERATION_TYPE: ${operationType} \n\n `
    );

    // Aggiorno end date dell'user con id preso e setto stato a 'Active'
    var user: LoccioniUser | undefined = this.dbService.getById(userId);
    if (user != undefined) {
      user.endDate = new Date(newEndDate);

      // Make sure that the user is active.
      user.isActive = true;
      user = this.dbService.update(user);
      console.log("User updated: \n" + user);
    }

    await taskService.complete(task, task.variables);
    console.log("\n\n------------ END REACTIVATE ACCOUNT ------------\n");
  }
}
