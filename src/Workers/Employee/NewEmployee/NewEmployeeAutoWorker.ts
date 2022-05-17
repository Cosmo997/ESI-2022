/// partono le sub
import { v4 } from "uuid";
import { ProcessController } from "../../../APIController/process_controller";
import { TaskController } from "../../../APIController/task_controller";
import { UserTask } from "../../../Model/model";
import { subToSendNewEmployeeInformationServiceTask } from "./SendInfo";
import { TaskDto } from "../../../api/src/generated-sources/openapi";

main();

async function main() {
  const processController = new ProcessController();
  const taskController = new TaskController();
  const userId = v4();

  // Start process instance
  const processInstanceId: string =
    await processController.startProcessInstance("NewEmployeeProcess");

  //---------- Subscribers ----------//
  subToSendNewEmployeeInformationServiceTask();

  //------------------------ AdministrationDepartment ------------------------------------//

  // getCurrentTak
  var taskDto: TaskDto = await taskController.getCurrentTask(processInstanceId);

  // claimCurrentTask
  await taskController.claimTask(taskDto, userId);

  // CollectEmployeeInformation
  const newEmployeeInformation = {
    variables: {
      email: { value: "email@email.it" },
      nome: { value: "mario" },
      cognome: { value: "rossi" },
    },
  };
  await taskController.submitForm(taskDto, newEmployeeInformation);

  // Generate EmployeeID
  taskDto = await taskController.getCurrentTask(processInstanceId);

  await taskController.claimTask(taskDto, userId);

  // Generate employeeID
  const newEmployeeID = {
    variables: {
      ID: { value: v4() },
    },
  };
  await taskController.submitForm(taskDto, newEmployeeID);

  //------------------------ HR Department ------------------------------------//
}
