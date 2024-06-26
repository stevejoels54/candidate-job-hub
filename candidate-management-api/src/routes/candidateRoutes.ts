import { Router } from "express";
import { candidateSchema } from "../validators/candidateValidator";
import {
  addOrUpdateCandidate,
  getCandidateByEmail,
  getAllCandidates,
  deleteCandidate,
} from "../controllers/candidateController";
import validate from "../middleware/validate";

const router = Router();

router.post("/", validate(candidateSchema), addOrUpdateCandidate);

router.get("/:email", getCandidateByEmail);

router.get("/", getAllCandidates);

router.delete("/:email", deleteCandidate);

export default router;
