"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize } = winston_1.format;
const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(colorize(), timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), customFormat),
    transports: [
        new winston_1.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston_1.transports.File({ filename: "logs/combined.log" }),
    ],
});
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.transports.Console({
        format: combine(colorize(), timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }), customFormat),
    }));
}
exports.default = logger;
