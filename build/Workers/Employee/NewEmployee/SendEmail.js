"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const axios_1 = __importDefault(require("axios"));
const camunda_config_1 = require("../../../config/camunda-config");
const client_1 = require("../../../client");
function sendEmail() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getCLient();
    client.subscribe('send-email', async function ({ task, taskService }) {
        const email = task.variables.get('email');
        const nome = task.variables.get('nome');
        const cognome = task.variables.get('cognome');
        //TODO axios call
        const body = {
            "messageName": "info",
            "businessKey": "businessKey",
            "processVariables": {
                "email": { "value": email, "type": "String" },
                "nome": { "value": nome, "type": "String" },
                "congome": { "value": cognome, "type": "String" },
            }
        };
        await axios_1.default.post('localhost:8080/engine-rest/message', body);
        await taskService.complete(task);
    });
}
exports.sendEmail = sendEmail;
