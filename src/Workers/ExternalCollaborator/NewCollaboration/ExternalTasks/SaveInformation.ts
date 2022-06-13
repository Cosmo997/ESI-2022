import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { v4 } from "uuid";
import { IExternalTask } from "../../../../IExternalTask";
import { LoccioniUser } from "../../../../Model/User";

export class SaveNewCollaborationExternalTask implements IExternalTask {
  async execute(task: Task, taskService: TaskService): Promise<void> {
    console.log("\n\n------------ SAVE NEW COLLABORATOR TASK ------------\n");

    const name = task.variables.get("COLLAB_NAME");
    const surname = task.variables.get("COLLAB_SURNAME");

    const newUser = new LoccioniUser({
      id: v4(),
      name: name,
      surname: surname,
      creationDate: new Date(),
      isActive: true,
    });

    const newProcessVariables = new Variables().set(
      "NEW_USER",
      JSON.stringify(newUser)
    );

    await taskService.complete(task, newProcessVariables);

    console.log("\n\n------------ END NEW COLLABORATOR TASK ------------\n");
  }
}
