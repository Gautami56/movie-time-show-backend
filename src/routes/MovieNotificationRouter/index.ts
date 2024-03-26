import express from "express";
import {
  getMovieNotificationsController,
  createMovieNotificationsController,
  sendMovieNotificationsController,
} from "../../controllers/MovieNotificationsController";

const movieNotificationRouter = express.Router();

movieNotificationRouter.get("/", getMovieNotificationsController);
movieNotificationRouter.post("/", createMovieNotificationsController);
movieNotificationRouter.get("/send-all", sendMovieNotificationsController);

export default movieNotificationRouter;
