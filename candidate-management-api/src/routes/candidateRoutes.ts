import { Router } from "express";
import { candidateSchema } from "../validators/candidateValidator";
import validate from "../middleware/validate";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from candidate routes!");
});

router.post("/", validate(candidateSchema), (req, res) => {
  res.send("Candidate created successfully!");
});

export default router;
