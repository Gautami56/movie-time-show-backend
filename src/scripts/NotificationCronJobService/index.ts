import * as cron from "node-cron";
import axios from "axios";
import { getSubscriptionDataService } from "../../services/SubscriptionDataService";
import { getMovieNotificationDataService } from "../../services/MovieNotificationDataService";
import webpush from "web-push";

async function filterUpcomingMovies(movies: any) {
    const currentDate = new Date();
    const tenDaysLater = new Date(
      currentDate.getTime() + 10 * 24 * 60 * 60 * 1000
    );
    console.log("currentDate", currentDate);
    console.log("tendayslater", tenDaysLater);
  
    return movies.filter((movie: any) => {
      // Calculate the release date based on 'days_until_release'
      const releaseDate = new Date(
        currentDate.getTime() + movie.expiryInDays * 24 * 60 * 60 * 1000
      );
  
      console.log("release date-----------------", releaseDate);
      return releaseDate >= currentDate && releaseDate <= tenDaysLater;
    });
  }
  
  
const triggerSendNotifications = async (): Promise<void> => {
  const apikKeys = {
    publicKey:
      "BAPP3Q6SPrY0fDjzugje1gjYNJev7M1c4JeYNnTxIjy2lYX9oPKgDfujFG5skA1ph-kLDEZy3JGYD3lI6DqvS-0",
    privateKey: "0bUwmDofZWCdi2tu7CZIJi4ZPQAjevdHCgE6K4W1R5A",
  };
  const subscriptions = await getSubscriptionDataService();
  const notifications = await getMovieNotificationDataService();

  const updatedMovie = await filterUpcomingMovies(notifications);
  console.log('updaedMovie---------------', updatedMovie)
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

    for (const notification of updatedMovie) {
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
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:8443/movie-notifications/send-all"
    //     );

    //     console.log("Notifications sent successfully");
    //   } catch (error) {
    //     console.error("Error sending notifications:", error);
    //   }
  }
};

cron.schedule("*/20 * * * * *", () => {
  console.log("Running the send notifications cron job");
  triggerSendNotifications();
});
