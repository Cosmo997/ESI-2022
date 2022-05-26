import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { v4 } from "uuid";
import { IExternalTask } from "../../../IExternalTask";
import { Ticket } from "../../../Model/Ticket";

export class SaveTicketExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ SAVING TICKET ------------\n");

    const newProcessVariables = new Variables().setAll({
      id: v4(),
      status: "received",
    });

    await taskService.complete(task, newProcessVariables);

    console.log(
      `\n------------SAVE TICKET OPERATION TERMINATED TASK ID: ${task.id} ------------\n\n`
    );
  }
}
