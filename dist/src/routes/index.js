"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieNotificationRouter_1 = __importDefault(require("./MovieNotificationRouter"));
const SubscriptionRouter_1 = __importDefault(require("./SubscriptionRouter"));
const router = express_1.default.Router();
router.use("/movie-notifications", MovieNotificationRouter_1.default);
router.use("/subscription", SubscriptionRouter_1.default);
exports.default = router;
