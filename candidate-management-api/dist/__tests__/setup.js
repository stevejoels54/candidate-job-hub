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
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = __importDefault(require("../config/winston"));
dotenv_1.default.config();
const env = process.env.NODE_ENV;
const sqlDatabaseUrlTest = process.env.SQL_DATABASE_URL_TEST;
const sqlDatabaseDialectTest = process.env.SQL_DATABASE_DIALECT_TEST;
const nosqlDatabaseUrlTest = process.env.NOSQL_DATABASE_URL_TEST;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    winston_1.default.info("Setting up tests");
    if (env !== "test") {
        throw new Error("NODE_ENV is not set to test. Aborting tests.");
    }
    else {
        winston_1.default.info("Environment: test");
    }
    if (!sqlDatabaseUrlTest || !sqlDatabaseDialectTest || !nosqlDatabaseUrlTest) {
        throw new Error("Test database URLs are not provided. Aborting tests.");
    }
}));
