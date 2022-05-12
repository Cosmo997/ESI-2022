"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractController = void 0;
const axios_1 = __importDefault(require("axios"));
const openapi_1 = require("../api/src/generated-sources/openapi");
const camunda_config_1 = require("../config/camunda-config");
class AbstractController {
    axiosInstance = axios_1.default.create({
        baseURL: camunda_config_1.baseUrl,
        timeout: 1000,
    });
    apiConfig = new openapi_1.Configuration({});
    baseUrl = camunda_config_1.baseUrl;
}
exports.AbstractController = AbstractController;
