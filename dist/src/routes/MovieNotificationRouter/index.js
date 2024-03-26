"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieNotificationsController_1 = require("../../controllers/MovieNotificationsController");
const movieNotificationRouter = express_1.default.Router();
movieNotificationRouter.get("/", MovieNotificationsController_1.getMovieNotificationsController);
movieNotificationRouter.post("/", MovieNotificationsController_1.createMovieNotificationsController);
movieNotificationRouter.get("/send-all", MovieNotificationsController_1.sendMovieNotificationsController);
exports.default = movieNotificationRouter;
