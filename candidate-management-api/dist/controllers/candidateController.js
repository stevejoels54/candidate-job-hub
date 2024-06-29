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
exports.deleteCandidate = exports.getAllCandidates = exports.getCandidateByEmail = exports.addOrUpdateCandidate = void 0;
const serviceLoader_1 = __importDefault(require("../services/serviceLoader"));
const redisClient_1 = __importDefault(require("../utils/redisClient"));
const candidateService = (0, serviceLoader_1.default)();
// controller function that adds, updates or deletes a candidate in the database
const addOrUpdateCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const candidateData = req.body;
    try {
        const { candidate, created } = yield candidateService.addOrUpdateCandidate(candidateData);
        // invalidate the cache
        yield redisClient_1.default.del("candidates");
        return res.status(created ? 201 : 200).json(candidate);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addOrUpdateCandidate = addOrUpdateCandidate;
// controller function that gets a candidate by email
const getCandidateByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        const candidate = yield candidateService.getCandidateByEmail(email);
        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found" });
        }
        return res.status(200).json(candidate);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getCandidateByEmail = getCandidateByEmail;
// controller function that gets all candidates
const getAllCandidates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Try to fetch the candidates from the cache
        const cachedCandidates = yield redisClient_1.default.get("candidates");
        if (cachedCandidates) {
            // If cached, return the parsed JSON candidates
            return res.status(200).json(JSON.parse(cachedCandidates));
        }
        // If not cached, fetch the candidates from the database
        const candidates = yield candidateService.getAllCandidates();
        // cache the candidates
        yield redisClient_1.default.set("candidates", JSON.stringify(candidates));
        return res.status(200).json(candidates);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllCandidates = getAllCandidates;
// controller function that deletes a candidate by email
const deleteCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        yield candidateService.deleteCandidate(email);
        // invalidate the cache
        yield redisClient_1.default.del("candidates");
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteCandidate = deleteCandidate;
