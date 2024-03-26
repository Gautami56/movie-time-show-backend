import type { Request, Response } from "express";
import { constants } from "http2";
import { saveSubscriptionService } from "../../services/SubscriptionService";

const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_OK,
} = constants;

export async function saveSubscriptionController(req: Request, res: Response) {
  try {
    console.log('req bodyyyyyy', req.body)
    if (req.body && !req.body) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Field value is not allowed to be null" });
    }
    const reqBody = {
      endpoint: req.body.subscription.endpoint,
      userUniqueId: req.body.userUniqueId,
      authKey: req.body.subscription.keys.auth,
      publicKey: req.body.subscription.keys.p256dh
    };
    const result = await saveSubscriptionService(reqBody);
    res.status(HTTP_STATUS_OK).send(result);
  } catch (error) {
    console.error("Unable to create the user - Controller", error);
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Unable to create the user",
    });
  }
}
