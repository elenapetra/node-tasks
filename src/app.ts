import { Server } from "net";
import connectDB from "./db";
import { healthCheck } from "./controllers/healthCheck.controller";
import { setupGracefulShutdown } from "./utils/gracefulShutdown";
import { logger } from "./utils/logger";
import { userRouter, authRouter, productRouter } from "./routers";
const bodyParser = require("body-parser");
const express = require("express");
const morganMiddleware = require("./utils/morganConfig");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || "http://localhost";

connectDB().then(() => {
  app.use(bodyParser.json());

  app.use("/api/profile", userRouter);
  app.use("/api/", productRouter);
  app.use("/api/auth", authRouter);

  app.get("/health", healthCheck);
});

const server: Server = app.listen(PORT, () => {
  logger.info(`Server running at ${BASE_URL}:${PORT}`);
});

app.use(morganMiddleware);

setupGracefulShutdown(server);
