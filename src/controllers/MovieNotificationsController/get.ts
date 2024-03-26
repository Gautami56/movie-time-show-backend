import type { Request, Response } from "express";
import { constants } from "http2";
import {} from "./index";
import { getMovieNotificationService } from "../../services/MovieNotificationService";

const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_OK,
  HTTP_STATUS_UNAUTHORIZED,
} = constants;

export async function getMovieNotificationsController(
  req: Request,
  res: Response
) {
  try {
    if (req.body && !req.body) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Field value is not allowed to be null" });
    }
    const result = await getMovieNotificationService();

    res.status(HTTP_STATUS_OK).send(result);
  } catch (error) {
    console.error("Unable to create the user - Controller", error);
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Unable to create the user",
    });
  }
}
