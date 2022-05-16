"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const openapi_1 = require("../api/src/generated-sources/openapi");
const abstract_controller_1 = require("./abstract_controller");
class MessageController extends abstract_controller_1.AbstractController {
    messageApi = new openapi_1.MessageApi(this.apiConfig, this.baseUrl, this.axiosInstance);
    async sendMessage(correlationMessageDto) {
        const result = await this.messageApi.deliverMessage(correlationMessageDto);
        return result;
    }
}
exports.MessageController = MessageController;
