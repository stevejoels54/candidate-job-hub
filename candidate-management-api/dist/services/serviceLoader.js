"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlDataAccess_1 = __importDefault(require("../dataAccess/sqlDataAccess"));
const noSqlDataAccess_1 = __importDefault(require("../dataAccess/noSqlDataAccess"));
const candidateService_1 = __importDefault(require("./candidateService"));
const loadCandidateService = () => {
    const databaseType = process.env.DATABASE_TYPE;
    let dataAccess;
    if (databaseType === "SQL") {
        dataAccess = new sqlDataAccess_1.default();
    }
    else if (databaseType === "NoSQL") {
        dataAccess = new noSqlDataAccess_1.default();
    }
    else {
        throw new Error("DATABASE_TYPE environment variable is not set correctly");
    }
    return new candidateService_1.default(dataAccess);
};
exports.default = loadCandidateService;
