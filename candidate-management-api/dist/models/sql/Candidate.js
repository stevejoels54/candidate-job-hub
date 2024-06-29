"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sqldb_1 = __importDefault(require("../../config/database/sqldb"));
class Candidate extends sequelize_1.Model {
}
Candidate.init({
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    callInterval: {
        type: sequelize_1.DataTypes.STRING,
    },
    linkedin: {
        type: sequelize_1.DataTypes.STRING,
    },
    github: {
        type: sequelize_1.DataTypes.STRING,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: sqldb_1.default,
    modelName: "Candidate",
});
exports.default = Candidate;
