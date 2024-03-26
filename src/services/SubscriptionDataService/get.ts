const subscriptions = require("./model");

export async function getSubscriptionDataService() {
  return await subscriptions.findAll();
}
