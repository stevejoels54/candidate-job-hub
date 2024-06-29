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
const Candidate_1 = __importDefault(require("../models/nosql/Candidate"));
class NoSqlDataAccess {
    // function to add or update a candidate
    addOrUpdateCandidate(candidateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCandidate = yield Candidate_1.default.findOne({
                email: candidateData.email,
            });
            const candidate = yield Candidate_1.default.findOneAndUpdate({ email: candidateData.email }, candidateData, { new: true, upsert: true });
            // const created = candidate.isNew;
            const created = !existingCandidate;
            return { candidate: candidate.toObject(), created };
        });
    }
    // function to get a candidate by email
    getCandidateByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Candidate_1.default.findOne({ email });
        });
    }
    // function to get all candidates
    getAllCandidates() {
        return __awaiter(this, void 0, void 0, function* () {
            const candidates = yield Candidate_1.default.find().sort({ _id: -1 });
            return candidates.map((candidate) => candidate.toObject());
        });
    }
    // function to delete a candidate by email and return nothing
    deleteCandidate(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Candidate_1.default.findOneAndDelete({ email });
        });
    }
}
exports.default = NoSqlDataAccess;
