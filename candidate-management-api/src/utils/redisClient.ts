import { createClient } from "redis";
import logger from "../config/winston";
import dotenv from "dotenv";

dotenv.config();

// get the env type from the .env file either development, production or test
const env = process.env.NODE_ENV || "development";
const redisUrl = process.env.REDIS_URL;
const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);
const redisPassword = process.env.REDIS_PASSWORD;

// if env is test or development, use the default redis client else, use the production redis client
if (env === "production") {
  var redisClient = createClient({
    password: redisPassword,
    socket: {
      host: redisUrl,
      port: redisPort,
      connectTimeout: 10000, // 10 seconds in milliseconds
      reconnectStrategy: function (retries) {
        if (retries > 20) {
          logger.error(
            "Too many attempts to reconnect. Redis connection was terminated"
          );
          return new Error("Too many retries.");
        } else {
          return retries * 500;
        }
      },
    },
  });
} else {
  var redisClient = createClient({
    socket: {
      connectTimeout: 10000, // 10 seconds in milliseconds
      reconnectStrategy: function (retries) {
        if (retries > 20) {
          logger.error(
            "Too many attempts to reconnect. Redis connection was terminated"
          );
          return new Error("Too many retries.");
        } else {
          return retries * 500;
        }
      },
    },
  }); // default redis client for development and test
}

redisClient.on("error", (err) => {
  logger.error("Redis error: ", err);
});

(async () => {
  await redisClient.connect();
})();

export const disconnectRedis = async () => {
  await redisClient.quit();
};

export default redisClient;
