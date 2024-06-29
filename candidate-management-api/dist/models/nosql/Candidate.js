"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CandidateSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: String,
    email: { type: String, required: true, unique: true },
    callInterval: String,
    linkedin: String,
    github: String,
    comment: { type: String, required: true },
});
const Candidate = mongoose_1.default.model("Candidate", CandidateSchema);
exports.default = Candidate;
