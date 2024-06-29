import dotenv from "dotenv";
import logger from "../config/winston";

dotenv.config();

const env = process.env.NODE_ENV;
const sqlDatabaseUrlTest = process.env.SQL_DATABASE_URL_TEST;
const sqlDatabaseDialectTest = process.env.SQL_DATABASE_DIALECT_TEST;
const nosqlDatabaseUrlTest = process.env.NOSQL_DATABASE_URL_TEST;

beforeAll(async () => {
  logger.info("Setting up tests");
  if (env !== "test") {
    throw new Error("NODE_ENV is not set to test. Aborting tests.");
  } else {
    logger.info("Environment: test");
  }

  if (!sqlDatabaseUrlTest || !sqlDatabaseDialectTest || !nosqlDatabaseUrlTest) {
    throw new Error("Test database URLs are not provided. Aborting tests.");
  }
});
