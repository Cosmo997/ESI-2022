"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateEndDateExternalTask = void 0;
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
class CalculateEndDateExternalTask {
    async execute(task, taskService) {
        console.log("\n\n------------ CALCULATE USER END DATE ------------\n");
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var endDate = new Date(year + 1, month, day);
        const newProcessVariables = new camunda_external_task_client_js_1.Variables().set("user-end-date", endDate);
        await taskService.complete(task, newProcessVariables);
        console.log("\nEnd Date Calculated!\n");
        console.log("\n------------ CALCULATE USER END DATE TERMINATED------------\n\n");
    }
}
exports.CalculateEndDateExternalTask = CalculateEndDateExternalTask;
