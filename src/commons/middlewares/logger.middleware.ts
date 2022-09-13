import { Request, Response } from "express";
import morgan from "morgan";
import { logger } from "../utils";

export const loggerMiddleware = morgan((tokens: any, req: Request & {user?: any}, res: Response): any => {
  const message = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
  logger.info(message, {
    body: req.body,
    ...(req.user ? { user_id: req.user.id } : {}),
  });
});
