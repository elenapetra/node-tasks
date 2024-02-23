const morgan = require("morgan");
import { Request, Response } from "express";

const morganMiddleware = morgan(
  (tokens: any, req: Request, res: Response) => {
    const status = tokens.status(req, res);
    const logLevel = status < 400 ? "INFO" : "ERROR";
    tokens["log-level"] = logLevel;

    return [
      "[",
      tokens.date(req, res, "web"),
      "]",
      logLevel,
      tokens.method(req, res),
      tokens.url(req, res),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  },
  {
    stream: process.stderr,
  }
);

module.exports = morganMiddleware;
