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
exports.ProcessController = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
class ProcessController {
    startProcessInstance(processKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let businessKey = (0, uuid_1.v4)();
            const body = { 'businessKey': businessKey };
            const res = yield axios_1.default.post(`http://localhost:8080/engine-rest/process-definition/key/${processKey}/start`, body);
            return res.data['id'];
        });
    }
    deleteProcess(processKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.delete(`http://localhost:8080/engine-rest/process-instance/${processKey}`);
            console.log("Response data: " + res.data);
        });
    }
    submitForm(processKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let businessKey = (0, uuid_1.v4)();
            const body = { 'businessKey': businessKey };
            const res = yield axios_1.default.post(`http://localhost:8080/engine-rest/process-definition/key/${processKey}/start`, body);
        });
    }
}
exports.ProcessController = ProcessController;
