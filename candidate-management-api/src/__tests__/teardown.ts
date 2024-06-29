import redisClient from "../utils/redisClient";
import { disconnectRedis } from "../utils/redisClient";
import logger from "../config/winston";

afterAll(async () => {
  // clear all the data in the redis database
  try {
    await redisClient.del("candidates");
  } catch (error) {
    logger.error(`Error clearing the redis database: ${error}`);
  }
  // teardown the redis client
  await disconnectRedis();
});
