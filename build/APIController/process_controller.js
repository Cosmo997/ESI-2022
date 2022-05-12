"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessController = void 0;
const uuid_1 = require("uuid");
const openapi_1 = require("../api/src/generated-sources/openapi");
const abstract_controller_1 = require("./abstract_controller");
class ProcessController extends abstract_controller_1.AbstractController {
    processDefinitionApi = new openapi_1.ProcessDefinitionApi(this.apiConfig, this.baseUrl, this.axiosInstance);
    async startProcessInstance(processKey) {
        let businessKey = (0, uuid_1.v4)();
        // const res = await axios.post(
        //   `http://localhost:8080/engine-rest/process-definition/key/${processKey}/start`,
        //   body
        // );
        const { data } = await this.processDefinitionApi.startProcessInstanceByKey(processKey, { businessKey: businessKey });
        return data.id ?? "id";
    }
}
exports.ProcessController = ProcessController;
