"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const abstract_controller_1 = require("./abstract_controller");
const openapi_1 = require("../api/src/generated-sources/openapi");
class TaskController extends abstract_controller_1.AbstractController {
    taskApi = new openapi_1.TaskApi(this.apiConfig, this.baseUrl, this.axiosInstance);
    async claimTask(userTask, userId) {
        console.log("\nclaim task with name: " + userTask.name + " and id: " + userTask.id);
        await this.taskApi.claim(userTask.id ?? "", { userId: userId });
        // const url = `${baseUrl}/task/${userTask.id}/claim`;
        // const body = { userId: userId };
        // await axios.post(url, body);
    }
    async getCurrentTask(proccessInstanceId) {
        const res = await this.taskApi.getTasks(proccessInstanceId);
        console.log("\nGet current task with process instance id: " + proccessInstanceId);
        for (let task of res.data) {
            console.log(task.name);
        }
        return res.data[0];
    }
    async submitForm(taskDto, body) {
        await this.taskApi.submit(taskDto.id, { variables: body });
        // console.log("\nSubmit form to userTask named: " + userTask.name);
        // const url = `${baseUrl}/task/${userTask.id}/submit-form`;
        // await axios.post(url, body);
    }
}
exports.TaskController = TaskController;
