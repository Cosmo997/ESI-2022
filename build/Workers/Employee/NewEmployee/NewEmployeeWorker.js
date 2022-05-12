"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/// partono le sub
const uuid_1 = require("uuid");
const process_controller_1 = require("../../../APIController/process_controller");
const task_controller_1 = require("../../../APIController/task_controller");
const SendInfo_1 = require("./SendInfo");
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const processController = new process_controller_1.ProcessController();
        const taskController = new task_controller_1.TaskController();
        const userId = (0, uuid_1.v4)();
        (0, SendInfo_1.subToSendNewEmployeeInformationServiceTask)();
        // Start process instance
        const processInstanceId = yield processController.startProcessInstance("NewEmployeeProcess");
        // getCurrentTak
        var userTask = yield taskController.getCurrentTask(processInstanceId);
        // claimCurrentTask
        yield taskController.claimTask(userTask, userId);
        // CollectEmployeeInformation
        const newEmployeeInformation = {
            variables: {
                email: { value: "email@email.it" },
                nome: { value: "mario" },
                cognome: { value: "rossi" },
            },
        };
        yield taskController.submitForm(userTask, newEmployeeInformation);
        // Generate EmployeeID
        userTask = yield taskController.getCurrentTask(processInstanceId);
        yield taskController.claimTask(userTask, userId);
        // Generate employeeID
        const newEmployeeID = {
            variables: {
                ID: { value: (0, uuid_1.v4)() },
            },
        };
        yield taskController.submitForm(userTask, newEmployeeID);
    });
}
