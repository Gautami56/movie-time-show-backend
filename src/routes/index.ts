import express from "express";

import movieNotificationRouter from "./MovieNotificationRouter";
import subscriptionRouter from "./SubscriptionRouter";

const router = express.Router();

router.use("/movie-notifications", movieNotificationRouter);
router.use("/subscription", subscriptionRouter)

export default router;
