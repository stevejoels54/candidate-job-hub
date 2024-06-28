import { ICandidate } from "../types";
import Candidate from "../models/sql/Candidate";

class SqlDataAccess {
  // function to add or update a candidate
  async addOrUpdateCandidate(
    candidateData: ICandidate
  ): Promise<{ candidate: ICandidate; created: boolean }> {
    // check if the candidate already exists and return true if created or false if updated
    const isCreated = !(await this.getCandidateByEmail(candidateData.email));
    const [candidate] = await Candidate.upsert(candidateData as any, {
      returning: true,
    });
    return { candidate, created: isCreated };
  }

  // function to get a candidate by email
  async getCandidateByEmail(email: string): Promise<ICandidate | null> {
    return await Candidate.findOne({ where: { email } });
  }

  // function to get all candidates
  async getAllCandidates(): Promise<ICandidate[]> {
    return await Candidate.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  // function to delete a candidate by email and return nothing
  async deleteCandidate(email: string): Promise<void> {
    await Candidate.destroy({ where: { email } });
  }
}

export default SqlDataAccess;
