"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cron = __importStar(require("node-cron"));
const SubscriptionDataService_1 = require("../../services/SubscriptionDataService");
const MovieNotificationDataService_1 = require("../../services/MovieNotificationDataService");
const web_push_1 = __importDefault(require("web-push"));
function filterUpcomingMovies(movies) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentDate = new Date();
        const tenDaysLater = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);
        console.log("currentDate", currentDate);
        console.log("tendayslater", tenDaysLater);
        return movies.filter((movie) => {
            // Calculate the release date based on 'days_until_release'
            const releaseDate = new Date(currentDate.getTime() + movie.expiryInDays * 24 * 60 * 60 * 1000);
            console.log("release date-----------------", releaseDate);
            return releaseDate >= currentDate && releaseDate <= tenDaysLater;
        });
    });
}
const triggerSendNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    const apikKeys = {
        publicKey: "BAPP3Q6SPrY0fDjzugje1gjYNJev7M1c4JeYNnTxIjy2lYX9oPKgDfujFG5skA1ph-kLDEZy3JGYD3lI6DqvS-0",
        privateKey: "0bUwmDofZWCdi2tu7CZIJi4ZPQAjevdHCgE6K4W1R5A",
    };
    const subscriptions = yield (0, SubscriptionDataService_1.getSubscriptionDataService)();
    const notifications = yield (0, MovieNotificationDataService_1.getMovieNotificationDataService)();
    const updatedMovie = yield filterUpcomingMovies(notifications);
    console.log('updaedMovie---------------', updatedMovie);
    web_push_1.default.setVapidDetails("mailto: gautu.pinkyar@gmail.com", apikKeys.publicKey, apikKeys.privateKey);
    // Iterate over each subscription
    for (const subscription of subscriptions) {
        // Construct keys object for the current subscription
        const keysToAdd = {
            p256dh: subscription.publicKey,
            auth: subscription.authKey,
        };
        // Add keys to the current subscription object
        subscription.keys = keysToAdd;
        for (const notification of updatedMovie) {
            const payload = JSON.stringify({
                title: notification.name,
                body: notification.description,
                icon: notification.icon,
            });
            try {
                // Send the current notification to the current subscription
                yield web_push_1.default.sendNotification(subscription, payload);
            }
            catch (error) {
                console.error(`Error sending notification to subscription: ${subscription.endpoint}`, error);
            }
        }
        //   try {
        //     const response = await axios.get(
        //       "http://localhost:8443/movie-notifications/send-all"
        //     );
        //     console.log("Notifications sent successfully");
        //   } catch (error) {
        //     console.error("Error sending notifications:", error);
        //   }
    }
});
cron.schedule("*/20 * * * * *", () => {
    console.log("Running the send notifications cron job");
    triggerSendNotifications();
});
