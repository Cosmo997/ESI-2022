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
const camunda_config_1 = require("./config/camunda-config");
const client_1 = require("./client");
const clientManager = new client_1.ClientManager(camunda_config_1.baseUrl);
const client = clientManager.getCLient();
client.subscribe("creditScoreChecker", function ({ task, taskService }) {
    return __awaiter(this, void 0, void 0, function* () {
        // Put your business logic
        // complete the task
        yield taskService.complete(task);
    });
});
