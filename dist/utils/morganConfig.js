"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("morgan");
const morganMiddleware = morgan((tokens, req, res) => {
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
}, {
    stream: process.stderr,
});
module.exports = morganMiddleware;
