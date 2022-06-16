import { Variables } from "camunda-external-task-client-js";
import { Task, TaskService } from "camunda-external-task-client-js";
import { stringify, v4 } from "uuid";
import { CommunicationManager } from "../../../../CommunicationManager";
import { GenericDbService } from "../../../../Database/service/generic_db_service";
import { IExternalTask } from "../../../../IExternalTask";
import { LoccioniUser } from "../../../../Model/User";
import { ProcessController } from "../../../../Utils/APIController/process_controller";

export class CalculateCustomerEndDateExternalTask implements IExternalTask {
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
    var durationString = task.variables.get("duration_key");
    var durationNumb = +durationString;

    var endDate = new Date(year, month, day, hours, minutes + durationNumb);

    /* ----- Get and set user variables ----- */
    const newUser = new LoccioniUser({
      id: v4(),
      name: task.variables.get("name_key"),
      surname: task.variables.get("surname_key"),
      creationDate: new Date(),
      isActive: true,
    });

    const newVariables = new Variables().setAll({
      NEW_USER: JSON.stringify(newUser),
      user_end_date: endDate.toISOString(),
    });

    /* ----- Save user on db ----- */
    this.dbService.create<LoccioniUser>(newUser);

    await taskService.complete(task, newVariables);
    console.log(
      "\n------------ CALCULATE USER END DATE TERMINATED------------\n\n"
    );
  }
}
