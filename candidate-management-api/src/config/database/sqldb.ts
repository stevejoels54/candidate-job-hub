import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Get the environment type from the .env file: development, production, or test
const env = process.env.NODE_ENV || "development";
const databaseUrl =
  env === "test"
    ? process.env.SQL_DATABASE_URL_TEST
    : process.env.SQL_DATABASE_URL;
const dialect =
  env === "test"
    ? process.env.SQL_DATABASE_DIALECT_TEST
    : process.env.SQL_DATABASE_DIALECT;

const sequelize = new Sequelize(databaseUrl as string, {
  dialect: dialect as any,
  logging: false,
});

export default sequelize;
