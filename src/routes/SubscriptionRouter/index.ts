import express from "express";
import {
    getSubscriptionController,
    saveSubscriptionController,
} from "../../controllers/SubscriptionController";

const subscriptionRouter = express.Router();

subscriptionRouter.get("/", getSubscriptionController);
subscriptionRouter.post("/", saveSubscriptionController);

export default subscriptionRouter;
