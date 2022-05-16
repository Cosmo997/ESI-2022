"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const camunda_config_1 = require("../config/camunda-config");
const axiosInstance = axios_1.default.create({
    baseURL: camunda_config_1.baseUrl,
    timeout: 1000,
});
function getAxiosInstance() {
    return axiosInstance;
}
exports.getAxiosInstance = getAxiosInstance;
