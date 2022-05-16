"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// partono le sub
const uuid_1 = require("uuid");
const process_controller_1 = require("../../../APIController/process_controller");
const task_controller_1 = require("../../../APIController/task_controller");
const SendInfo_1 = require("./SendInfo");
main();
async function main() {
    const processController = new process_controller_1.ProcessController();
    const taskController = new task_controller_1.TaskController();
    const userId = (0, uuid_1.v4)();
    // Start process instance
    const processInstanceId = await processController.startProcessInstance("NewEmployeeProcess");
    //------------------------ AdministrationDepartment ------------------------------------//
    (0, SendInfo_1.subToSendNewEmployeeInformationServiceTask)();
    // getCurrentTak
    var taskDto = await taskController.getCurrentTask(processInstanceId);
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
            ID: { value: (0, uuid_1.v4)() },
        },
    };
    await taskController.submitForm(taskDto, newEmployeeID);
    //------------------------ HR Department ------------------------------------//
}
