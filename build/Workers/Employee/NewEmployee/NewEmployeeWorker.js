"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// partono le sub
const SendEmail_1 = require("./SendEmail");
const SendInfo_1 = require("./SendInfo");
(0, SendInfo_1.sendInfo)();
(0, SendEmail_1.sendEmail)();
