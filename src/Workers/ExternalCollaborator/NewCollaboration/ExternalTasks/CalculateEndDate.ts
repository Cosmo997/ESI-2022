import { Variables } from "camunda-external-task-client-js";

import { Task, TaskService } from "camunda-external-task-client-js";
import { IExternalTask } from "../../../../IExternalTask";

export class CalculateEndDateExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ CALCULATE USER END DATE ------------\n");
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var endDate = new Date(year + 1, month, day);
    const newProcessVariables = new Variables().set("user-end-date", endDate);

    await taskService.complete(task, newProcessVariables);
    console.log("\nEnd Date Calculated!\n");

    console.log(
      "\n------------ CALCULATE USER END DATE TERMINATED------------\n\n"
    );
  }
}
