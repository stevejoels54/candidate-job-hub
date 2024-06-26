import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// get the env type from the .env file either development, production or test
const env = process.env.NODE_ENV || "development";
const databaseUrl =
  env === "test" ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;
const dialect =
  env === "test" ? process.env.DB_DIALECT_TEST : process.env.DB_DIALECT;

const db = new Sequelize(databaseUrl as string, {
  dialect: dialect as any,
  logging: env === "test" ? console.log : false,
});

export default db;
