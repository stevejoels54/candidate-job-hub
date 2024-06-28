import { ICandidate } from "../types";
import Candidate from "../models/nosql/Candidate";

class NoSqlDataAccess {
  // function to add or update a candidate
  async addOrUpdateCandidate(
    candidateData: ICandidate
  ): Promise<{ candidate: ICandidate; created: boolean }> {
    const existingCandidate = await Candidate.findOne({
      email: candidateData.email,
    });
    const candidate = await Candidate.findOneAndUpdate(
      { email: candidateData.email },
      candidateData,
      { new: true, upsert: true }
    );
    // const created = candidate.isNew;
    const created = !existingCandidate;
    return { candidate: candidate.toObject(), created };
  }

  // function to get a candidate by email
  async getCandidateByEmail(email: string): Promise<ICandidate | null> {
    return await Candidate.findOne({ email });
  }

  // function to get all candidates
  async getAllCandidates(): Promise<ICandidate[]> {
    const candidates = await Candidate.find().sort({ _id: -1 });
    return candidates.map((candidate) => candidate.toObject());
  }

  // function to delete a candidate by email and return nothing
  async deleteCandidate(email: string): Promise<void> {
    await Candidate.findOneAndDelete({ email });
  }
}

export default NoSqlDataAccess;
