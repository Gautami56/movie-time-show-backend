import { getSubscriptionDataService } from "../SubscriptionDataService/get";
import { getMovieNotificationDataService } from "../MovieNotificationDataService";
import webpush from "web-push";

const apikKeys = {
  publicKey:
    "BAPP3Q6SPrY0fDjzugje1gjYNJev7M1c4JeYNnTxIjy2lYX9oPKgDfujFG5skA1ph-kLDEZy3JGYD3lI6DqvS-0",
  privateKey: "0bUwmDofZWCdi2tu7CZIJi4ZPQAjevdHCgE6K4W1R5A",
};

export async function sendMovieNotificationsService(withinDaysLimit?: number) {
  const subscriptions = await getSubscriptionDataService();
  const notifications = await getMovieNotificationDataService();
  webpush.setVapidDetails(
    "mailto: gautu.pinkyar@gmail.com",
    apikKeys.publicKey,
    apikKeys.privateKey
  );
  // Iterate over each subscription
  for (const subscription of subscriptions) {
    // Construct keys object for the current subscription
    const keysToAdd = {
      p256dh: subscription.publicKey,
      auth: subscription.authKey,
    };

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
        await webpush.sendNotification(subscription, payload);
      } catch (error) {
        console.error(
          `Error sending notification to subscription: ${subscription.endpoint}`,
          error
        );
      }
    }
  }

  return { status: "Success", message: "Messages sent to push service" };
}
