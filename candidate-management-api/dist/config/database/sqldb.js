"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Get the environment type from the .env file: development, production, or test
const env = process.env.NODE_ENV || "development";
const databaseUrl = env === "test"
    ? process.env.SQL_DATABASE_URL_TEST
    : process.env.SQL_DATABASE_URL;
const dialect = env === "test"
    ? process.env.SQL_DATABASE_DIALECT_TEST
    : process.env.SQL_DATABASE_DIALECT;
const sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialectModule: require("pg"),
    // dialect: dialect as any,
    logging: false,
});
exports.default = sequelize;
