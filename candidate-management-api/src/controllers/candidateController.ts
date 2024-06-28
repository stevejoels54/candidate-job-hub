import { Request, Response } from "express";
import loadCandidateService from "../services/serviceLoader";
import { ICandidate } from "../types";
import redisClient from "../utils/redisClient";

const candidateService = loadCandidateService();

// controller function that adds, updates or deletes a candidate in the database
export const addOrUpdateCandidate = async (req: Request, res: Response) => {
  const candidateData: ICandidate = req.body;
  try {
    const { candidate, created } = await candidateService.addOrUpdateCandidate(
      candidateData
    );
    // invalidate the cache
    await redisClient.del("candidates");
    return res.status(created ? 201 : 200).json(candidate);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller function that gets a candidate by email
export const getCandidateByEmail = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    const candidate = await candidateService.getCandidateByEmail(email);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    return res.status(200).json(candidate);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller function that gets all candidates
export const getAllCandidates = async (req: Request, res: Response) => {
  try {
    // Try to fetch the candidates from the cache
    const cachedCandidates = await redisClient.get("candidates");

    if (cachedCandidates) {
      // If cached, return the parsed JSON candidates
      return res.status(200).json(JSON.parse(cachedCandidates));
    }

    // If not cached, fetch the candidates from the database
    const candidates = await candidateService.getAllCandidates();

    // cache the candidates
    await redisClient.set("candidates", JSON.stringify(candidates));
    return res.status(200).json(candidates);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller function that deletes a candidate by email
export const deleteCandidate = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    await candidateService.deleteCandidate(email);
    // invalidate the cache
    await redisClient.del("candidates");
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
