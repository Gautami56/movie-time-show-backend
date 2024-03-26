import { createMovieNotificationDataService } from "../MovieNotificationDataService/create";

export async function createMovieNotificationService(data: {
  name: string;
  description: string;
  expiryInDays: number;
  icon: string;
}) {
  return await createMovieNotificationDataService(data);
}
