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
exports.sendEmail = void 0;
const axios_1 = __importDefault(require("axios"));
const camunda_config_1 = require("../../../config/camunda-config");
const client_1 = require("../../../client");
function sendEmail() {
    const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
    const client = clientManager.getCLient();
    client.subscribe('send-email', function ({ task, taskService }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield axios_1.default.post('localhost:8080/engine-rest/message', body);
            yield taskService.complete(task);
        });
    });
}
exports.sendEmail = sendEmail;
