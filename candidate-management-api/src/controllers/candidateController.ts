import { Request, Response } from "express";
import loadCandidateService from "../services/serviceLoader";
import { ICandidate } from "../types";

const candidateService = loadCandidateService();

// controller function that adds, updates or deletes a candidate in the database
export const addOrUpdateCandidate = async (req: Request, res: Response) => {
  const candidateData: ICandidate = req.body;
  try {
    const { candidate, created } = await candidateService.addOrUpdateCandidate(
      candidateData
    );
    return res.status(created ? 201 : 200).json({ candidate });
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
    return res.status(200).json({ candidate });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller function that gets all candidates
export const getAllCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await candidateService.getAllCandidates();
    return res.status(200).json({ candidates });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller function that deletes a candidate by email
export const deleteCandidate = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    await candidateService.deleteCandidate(email);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// import Candidate from "../models/Candidate";
// import redisClient from "../utils/redisClient";

// const CACHE_EXPIRATION = 3600;

// // controller function that adds or updates a candidate
// export const addOrUpdateCandidate = async (req: Request, res: Response) => {
//   const {
//     firstName,
//     lastName,
//     phoneNumber,
//     email,
//     callInterval,
//     linkedIn,
//     github,
//     comment,
//   } = req.body;

//   try {
//     let candidate = await Candidate.findOne({ where: { email } }); // email is unique in the database
//     if (candidate) {
//       candidate.firstName = firstName;
//       candidate.lastName = lastName;
//       candidate.phoneNumber = phoneNumber;
//       candidate.callInterval = callInterval;
//       candidate.linkedin = linkedIn;
//       candidate.github = github;
//       candidate.comment = comment;
//     } else {
//       candidate = new Candidate({
//         firstName,
//         lastName,
//         phoneNumber,
//         email,
//         callInterval,
//         linkedIn,
//         github,
//         comment,
//       });
//     }

//     await candidate.save();

//     // invalidate the cache
//     await redisClient.del("candidates").catch((error) => {
//       console.error(error);
//     });

//     // return the created or updated candidate
//     return res.status(201).json({ candidate });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
