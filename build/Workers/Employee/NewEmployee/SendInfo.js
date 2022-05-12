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
exports.subToSendNewEmployeeInformationServiceTask = void 0;
const client_1 = require("../../../client");
const camunda_config_1 = require("../../../config/camunda-config");
const message_controller_1 = require("../../../APIController/message_controller");
function subToSendNewEmployeeInformationServiceTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
        const client = clientManager.getCLient();
        client.subscribe('send-info', function ({ task, taskService }) {
            return __awaiter(this, void 0, void 0, function* () {
                const email = task.variables.get('email');
                const nome = task.variables.get('nome');
                const cognome = task.variables.get('cognome');
                const id = task.variables.get('ID');
                const businessKey = task.businessKey;
                console.log('Business Key: ' + businessKey);
                const body = {
                    "messageName": "info",
                    "businessKey": businessKey,
                    "processVariables": {
                        "email": { "value": email, "type": "String" },
                        "nome": { "value": nome, "type": "String" },
                        "cognome": { "value": cognome, "type": "String" },
                        "ID": { "value": id, "type": "String" },
                    }
                };
                yield taskService.complete(task);
                yield (0, message_controller_1.sendMessage)(body);
                client.stop();
            });
        });
    });
}
exports.subToSendNewEmployeeInformationServiceTask = subToSendNewEmployeeInformationServiceTask;
