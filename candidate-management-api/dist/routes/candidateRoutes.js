"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidateValidator_1 = require("../validators/candidateValidator");
const candidateController_1 = require("../controllers/candidateController");
const validate_1 = __importDefault(require("../middleware/validate"));
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.default)(candidateValidator_1.candidateSchema), candidateController_1.addOrUpdateCandidate);
router.put("/", (0, validate_1.default)(candidateValidator_1.candidateSchema), candidateController_1.addOrUpdateCandidate);
router.get("/:email", candidateController_1.getCandidateByEmail);
router.get("/", candidateController_1.getAllCandidates);
router.delete("/:email", candidateController_1.deleteCandidate);
exports.default = router;
