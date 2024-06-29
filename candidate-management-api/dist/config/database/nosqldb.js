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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = __importDefault(require("../winston"));
dotenv_1.default.config();
// Get the environment type from the .env file: development, production, or test
const env = process.env.NODE_ENV || "development";
const databaseUrl = env === "test"
    ? process.env.NOSQL_DATABASE_URL_TEST
    : process.env.NOSQL_DATABASE_URL;
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(databaseUrl);
        winston_1.default.info("MongoDB connected successfully");
    }
    catch (error) {
        winston_1.default.error("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
});
exports.default = connectMongoDB;
