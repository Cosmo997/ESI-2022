"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// State of the task.
var TaskState;
(function (TaskState) {
    TaskState[TaskState["CREATED"] = 0] = "CREATED";
    TaskState[TaskState["COMPLETED"] = 1] = "COMPLETED";
    TaskState[TaskState["CANCELED"] = 2] = "CANCELED";
})(TaskState || (TaskState = {}));
