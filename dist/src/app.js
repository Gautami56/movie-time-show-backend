"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
require("./scripts/NotificationCronJobService/index");
const defaultPortNumber = 8443;
const port = Number(process.env.PORT || defaultPortNumber);
index_1.default.listen(port, () => {
    console.log(`App listening on port ${port}......`);
});
