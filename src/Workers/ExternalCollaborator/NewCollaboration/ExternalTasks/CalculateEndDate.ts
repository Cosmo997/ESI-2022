import { Variables } from "camunda-external-task-client-js";
import { Task, TaskService } from "camunda-external-task-client-js";
import { v4 } from "uuid";
import { GenericDbService } from "../../../../Database/service/generic_db_service";
import { IExternalTask } from "../../../../IExternalTask";
import { LoccioniUser } from "../../../../Model/User";

export class CalculateEndDateExternalTask implements IExternalTask {
  dbService: GenericDbService;
  constructor(dbService: GenericDbService) {
    this.dbService = dbService;
  }
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ CALCULATE USER END DATE ------------\n");
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var endDate = new Date(year, month, day, hours, minutes + 2);

    // Get User from process variables
    var user: LoccioniUser = JSON.parse(task.variables.get("NEW_USER"));

    // Get Username from process variables
    var username: string = task.variables.get("COLLAB_USERNAME");

    // Get Password from process variables
    var password: string = task.variables.get("COLLAB_PASSWORD");

    // Update user info
    user.username = username;
    user.password = password;
    user.endDate = endDate;

    // Save user on db
    this.dbService.create<LoccioniUser>(user);

    const newProcessVariables = new Variables().set("user_end_date", endDate);

    console.log("\nEnd Date Calculated!\n");

    console.log(
      "\n------------ CALCULATE USER END DATE TERMINATED------------\n\n"
    );
    await taskService.complete(task, newProcessVariables);
  }
}
