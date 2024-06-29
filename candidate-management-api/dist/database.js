"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// get the env type from the .env file either development, production or test
const env = process.env.NODE_ENV || "development";
const databaseUrl = env === "test" ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;
const dialect = env === "test" ? process.env.DB_DIALECT_TEST : process.env.DB_DIALECT;
const db = new sequelize_1.Sequelize(databaseUrl, {
    dialect: dialect,
    logging: env === "test" ? console.log : false,
});
exports.default = db;
