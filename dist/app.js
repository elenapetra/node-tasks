"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const healthCheck_controller_1 = require("./controllers/healthCheck.controller");
const gracefulShutdown_1 = require("./utils/gracefulShutdown");
const logger_1 = require("./utils/logger");
const routers_1 = require("./routers");
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(morgan("[[:date[web]]  :method :url - :response-time ms]"));
// let connections: Socket[] = [];
const server = app.listen(PORT, () => {
    logger_1.logger.info(`Server running at http://localhost:${PORT}`);
});
// server.on("connection", (connection: Socket) => {
//   connections.push(connection);
//   connection.on("close", () => {
//     connections = connections.filter(
//       (currentConnection) => currentConnection !== connection
//     );
//   });
// });
(0, gracefulShutdown_1.setupGracefulShutdown)(server);
(0, db_1.default)().then(() => {
    app.use(bodyParser.json());
    app.use("/api/profile", routers_1.userRouter);
    app.use("/api/", routers_1.productRouter);
    app.use("/api/auth", routers_1.authRouter);
    app.get("/health", healthCheck_controller_1.healthCheck);
});
