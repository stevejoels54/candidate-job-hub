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
const redisClient_1 = __importDefault(require("../utils/redisClient"));
const redisClient_2 = require("../utils/redisClient");
const winston_1 = __importDefault(require("../config/winston"));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // clear all the data in the redis database
    try {
        yield redisClient_1.default.del("candidates");
    }
    catch (error) {
        winston_1.default.error(`Error clearing the redis database: ${error}`);
    }
    // teardown the redis client
    yield (0, redisClient_2.disconnectRedis)();
}));
