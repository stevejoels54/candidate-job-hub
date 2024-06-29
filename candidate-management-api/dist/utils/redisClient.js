"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectRedis = void 0;
const redis_1 = require("redis");
const winston_1 = __importDefault(require("../config/winston"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// get the env type from the .env file either development, production or test
const env = process.env.NODE_ENV || "development";
const redisUrl = process.env.REDIS_URL;
const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);
const redisPassword = process.env.REDIS_PASSWORD;
// if env is test or development, use the default redis client else, use the production redis client
if (env === "production" || env === "development") {
    var redisClient = (0, redis_1.createClient)({
        password: redisPassword,
        socket: {
            host: redisUrl,
            port: redisPort,
            connectTimeout: 10000, // 10 seconds in milliseconds
            reconnectStrategy: function (retries) {
                if (retries > 20) {
                    winston_1.default.error("Too many attempts to reconnect. Redis connection was terminated");
                    return new Error("Too many retries.");
                }
                else {
                    return retries * 500;
                }
            },
        },
    });
}
else {
    var redisClient = (0, redis_1.createClient)({
        socket: {
            connectTimeout: 10000, // 10 seconds in milliseconds
            reconnectStrategy: function (retries) {
                if (retries > 20) {
                    winston_1.default.error("Too many attempts to reconnect. Redis connection was terminated");
                    return new Error("Too many retries.");
                }
                else {
                    return retries * 500;
                }
            },
        },
    }); // default redis client for development and test
}
redisClient.on("error", (err) => {
    winston_1.default.error("Redis error: ", err);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.connect();
}))();
const disconnectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.quit();
});
exports.disconnectRedis = disconnectRedis;
exports.default = redisClient;
