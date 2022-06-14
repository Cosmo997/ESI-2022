import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { GenericDbService } from "../../../Database/service/generic_db_service";
import { IExternalTask } from "../../../IExternalTask";
import { LoccioniUser } from "../../../Model/User";

export class DeactiveAccountExternalTask implements IExternalTask {
  dbService: GenericDbService;
  constructor(dbService: GenericDbService) {
    this.dbService = dbService;
  }
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log(
      "\n\n------------ START DEACTIVE COLLABORATOR TASK ------------\n"
    );

    var user: LoccioniUser = JSON.parse(task.variables.get("NEW_USER"));

    user.isActive = false;

    this.dbService.update(user);

    console.log("User " + user.name + " deactivated.");
    await taskService.complete(task);

    console.log(
      "\n\n------------ END DEACTIVE COLLABORATOR TASK ------------\n"
    );
  }
}
