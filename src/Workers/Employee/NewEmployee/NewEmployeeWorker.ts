/// partono le sub
import { v4 } from "uuid";
import { ProcessController } from "../../../APIController/process_controller";
import { TaskController } from "../../../APIController/task_controller";
import { UserTask } from "../../../Model/model";
import { subToSendNewEmployeeInformationServiceTask } from "./SendInfo";

main();

async function main() {
  const processController = new ProcessController();
  const taskController = new TaskController();
  const userId = v4();

  // Start process instance
  const processInstanceId: string = await processController.startProcessInstance("NewEmployeeProcess");
  
  //------------------------ AdministrationDepartment ------------------------------------//

  subToSendNewEmployeeInformationServiceTask();

  // getCurrentTak
  var userTask: UserTask = await taskController.getCurrentTask(processInstanceId);

  // claimCurrentTask
  await taskController.claimTask(userTask, userId);

  // CollectEmployeeInformation
  const newEmployeeInformation = {
    variables: {
      email: { value: "email@email.it" },
      nome: { value: "mario" },
      cognome: { value: "rossi" },
    },
  };
  await taskController.submitForm(userTask, newEmployeeInformation);

  // Generate EmployeeID
  userTask = await taskController.getCurrentTask(processInstanceId);

  await taskController.claimTask(userTask, userId);

  // Generate employeeID
  const newEmployeeID = {
    variables: {
      ID: { value: v4() },
    },
  };
  await taskController.submitForm(userTask, newEmployeeID)
  
  //------------------------ HR Department ------------------------------------//
  
}
