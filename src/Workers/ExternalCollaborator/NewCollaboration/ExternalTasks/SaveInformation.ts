import { Task, TaskService, Variables } from "camunda-external-task-client-js";
import { v4 } from "uuid";
import { usersSchema } from "../../../../Database/DbPath";
import { paperMadeDB } from "../../../../Database/DbRepoInstance";
import { GenericDbService } from "../../../../Database/service/generic_db_service";
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

    // Save the newUser on the Papermade files..
    // const service = new GenericDbService(paperMadeDB, usersSchema);
    // service.create<LoccioniUser>(newUser);

    const newProcessVariables = new Variables().set(
      "NEW_USER",
      JSON.stringify(newUser)
    );

    await taskService.complete(task, newProcessVariables);

    console.log("\n\n------------ END NEW COLLABORATOR TASK ------------\n");
  }
}
