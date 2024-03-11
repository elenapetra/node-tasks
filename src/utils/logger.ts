import winston from "winston";

const configureLogger = () => {
  const logger = winston.createLogger({
    level:
      process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
        ? "debug"
        : "info",
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  });

  return logger;
};

export const logger = configureLogger();
