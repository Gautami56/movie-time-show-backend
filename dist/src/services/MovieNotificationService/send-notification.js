"use strict";
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
exports.sendNotificationService = void 0;
const web_push_1 = __importDefault(require("web-push"));
const apikKeys = {
    publicKey: "BAPP3Q6SPrY0fDjzugje1gjYNJev7M1c4JeYNnTxIjy2lYX9oPKgDfujFG5skA1ph-kLDEZy3JGYD3lI6DqvS-0",
    privateKey: "0bUwmDofZWCdi2tu7CZIJi4ZPQAjevdHCgE6K4W1R5A",
};
function sendNotificationService(subscriptions, notifications) {
    return __awaiter(this, void 0, void 0, function* () {
        web_push_1.default.setVapidDetails("mailto: gautu.pinkyar@gmail.com", apikKeys.publicKey, apikKeys.privateKey);
        //  // Iterate over each subscription
        for (const subscription of subscriptions) {
            // Construct keys object for the current subscription
            const keysToAdd = {
                p256dh: subscription.publicKey,
                auth: subscription.authKey,
            };
            console.log('subscription---------------------', subscription);
            // Add keys to the current subscription object
            subscription.keys = keysToAdd;
            for (const notification of notifications) {
                const payload = JSON.stringify({
                    title: notification.name,
                    body: notification.description,
                    icon: notification.icon,
                });
                try {
                    // Send the current notification to the current subscription
                    return yield web_push_1.default.sendNotification(subscription, payload);
                }
                catch (error) {
                    console.error(`Error sending notification to subscription: ${subscription.endpoint}`, error);
                }
            }
        }
    });
}
exports.sendNotificationService = sendNotificationService;
