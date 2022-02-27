const winston = require("winston");
const path = require("path");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.align(),
  winston.format.printf((info) => {
    const { timestamp, level, message, stack } = info;
    if (stack) return `[${timestamp}] [${level}]: ${stack}`;
    return `[${timestamp}] [${level}]: ${message}`;
  })
);

const transports = [
  new winston.transports.Console({
    level: "debug",
    prettyPrint: true,
    handleExceptions: true,
  }),
  new winston.transports.File({
    level: "error",
    format: winston.format.uncolorize(),
    filename: path.join(__dirname, "../logs/error.log"),
    handleExceptions: true,
    json: true,
  }),
  new winston.transports.File({
    format: winston.format.uncolorize(),
    filename: path.join(__dirname, "../logs/access.log"),
    json: true,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

module.exports = logger;
