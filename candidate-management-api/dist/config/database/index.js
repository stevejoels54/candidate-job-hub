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
const sqldb_1 = __importDefault(require("./sqldb"));
const nosqldb_1 = __importDefault(require("./nosqldb"));
const winston_1 = __importDefault(require("../winston"));
dotenv_1.default.config();
const databaseType = process.env.DATABASE_TYPE;
if (!databaseType) {
    throw new Error("DATABASE_TYPE environment variable is not set");
}
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (databaseType === "SQL") {
        yield sqldb_1.default.sync();
        winston_1.default.info("SQL database connected successfully");
    }
    else if (databaseType === "NoSQL") {
        yield (0, nosqldb_1.default)();
    }
    else {
        throw new Error(`Unsupported DATABASE_TYPE: ${databaseType}`);
    }
});
exports.default = connectDB;
