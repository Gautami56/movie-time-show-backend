const notifications = require("./model");

export async function getMovieNotificationDataService() {
  return await notifications.findAll();
}
