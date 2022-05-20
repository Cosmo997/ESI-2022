"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subToCalculateEndDate = void 0;
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
const message_controller_1 = require("../../../../APIController/message_controller");
const client_1 = require("../../../../client");
const camunda_config_1 = require("../../../../config/camunda-config");
/**
 * Prendere le variabili email, nome, cognome e id ed inviarle
 */
async function subToCalculateEndDate() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getClient();
    const messageController = new message_controller_1.MessageController();
    client.subscribe("calculate-end-date", async function ({ task, taskService }) {
        console.log("\n\n------------ CALCULATE USER END DATE ------------\n");
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var endDate = new Date(year + 1, month, day);
        const newProcessVariables = new camunda_external_task_client_js_1.Variables().set("user-end-date", endDate);
        taskService.complete(task, newProcessVariables);
        console.log("\nEnd Date Calculated!\n");
        console.log("\n------------ CALCULATE USER END DATE TERMINATED------------\n\n");
        //client.stop();
    });
}
exports.subToCalculateEndDate = subToCalculateEndDate;
