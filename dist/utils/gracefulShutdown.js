"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGracefulShutdown = void 0;
const logger_1 = require("./logger");
let connections = [];
const setupGracefulShutdown = (server) => {
    server.on("connection", (connection) => {
        connections.push(connection);
        connection.on("close", () => {
            connections = connections.filter((currentConnection) => currentConnection !== connection);
        });
    });
    const shutdown = () => {
        logger_1.logger.info("Received kill signal, shutting down gracefully");
        server.close(() => {
            logger_1.logger.info("Closed out remaining connections");
            process.exit(0);
        });
        setTimeout(() => {
            logger_1.logger.error("Could not close connections in time, forcefully shutting down");
            process.exit(1);
        }, 20000);
        connections.forEach((connection) => connection.end());
        setTimeout(() => {
            connections.forEach((connection) => connection.destroy());
        }, 10000);
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
};
exports.setupGracefulShutdown = setupGracefulShutdown;
