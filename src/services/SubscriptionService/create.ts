import { saveSubscriptionDataService } from "../SubscriptionDataService/create";

export async function saveSubscriptionService(data: {
  endpoint: string;
  userUniqueId: string;
  publicKey: string;
  authKey: string
}) {
  console.log('entering save service', data)
  return await saveSubscriptionDataService(data);
}
