"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SubscriptionController_1 = require("../../controllers/SubscriptionController");
const subscriptionRouter = express_1.default.Router();
subscriptionRouter.get("/", SubscriptionController_1.getSubscriptionController);
subscriptionRouter.post("/", SubscriptionController_1.saveSubscriptionController);
exports.default = subscriptionRouter;
