import type { Request, Response } from "express";
import { constants } from "http2";
import {} from "./index";
import { sendMovieNotificationsService } from "../../services/MovieNotificationService";

const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_OK,
  HTTP_STATUS_UNAUTHORIZED,
} = constants;

export async function sendMovieNotificationsController(
  req: Request,
  res: Response
) {
  try {
    const result = await sendMovieNotificationsService();

    res.status(HTTP_STATUS_OK).send(result);
  } catch (error) {
    console.error("Unable to create the user - Controller", error);
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Unable to create the user",
    });
  }
}
