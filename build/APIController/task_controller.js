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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const axios_1 = __importDefault(require("axios"));
const camunda_config_1 = require("../config/camunda-config");
class TaskController {
    claimTask(userTask, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('\nclaim task with name: ' + userTask.name + ' and id: ' + userTask.id);
            const url = `${camunda_config_1.baseUrl}/task/${userTask.id}/claim`;
            const body = { "userId": userId };
            yield axios_1.default.post(url, body);
        });
    }
    getCurrentTask(proccessInstanceId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('\nGet current task with process instance id: ' + proccessInstanceId);
            const url = `${camunda_config_1.baseUrl}/task?processInstanceId=${proccessInstanceId}`;
            const res = yield axios_1.default.get(url);
            for (let task of res.data) {
                console.log(task.name);
            }
            return res.data[0];
        });
    }
    submitForm(userTask, body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('\nSubmit form to userTask named: ' + userTask.name);
            const url = `${camunda_config_1.baseUrl}/task/${userTask.id}/submit-form`;
            yield axios_1.default.post(url, body);
        });
    }
}
exports.TaskController = TaskController;
