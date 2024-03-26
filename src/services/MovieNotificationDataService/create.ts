const notifications = require("./model");

export async function createMovieNotificationDataService(data: {
  name: string;
  description: string;
  expiryInDays: number;
  icon: string;
}) {
  return (await notifications.create(data)).get();
}
