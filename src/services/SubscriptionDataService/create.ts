const subscriptions = require("./model");

export async function saveSubscriptionDataService(data: {
  endpoint: string;
  userUniqueId: string;
  publicKey: string;
  authKey: string
}) {
  console.log('entering save data service')
  return (await subscriptions.create(data)).get();
}
