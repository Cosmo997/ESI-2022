"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientManager = void 0;
// Per i tipi abbiamo bisogno di fare npm i --save-dev @types/camunda-external-task-client-js
const camunda_external_task_client_js_1 = require("camunda-external-task-client-js");
class ClientManager {
    constructor(_url) {
        this.config = {
            baseUrl: "",
            use: camunda_external_task_client_js_1.logger,
        };
        this.config.baseUrl = _url;
        this.client = new camunda_external_task_client_js_1.Client(this.config);
    }
    getCLient() {
        return this.client;
    }
}
exports.ClientManager = ClientManager;
