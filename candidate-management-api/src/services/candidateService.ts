import { ICandidate, IDataAccess } from "../types";

class CandidateService {
  private dataAccess: IDataAccess;

  constructor(dataAccess: IDataAccess) {
    this.dataAccess = dataAccess;
  }

  async addOrUpdateCandidate(
    candidateData: ICandidate
  ): Promise<{ candidate: ICandidate; created: boolean }> {
    return await this.dataAccess.addOrUpdateCandidate(candidateData);
  }

  async getCandidateByEmail(email: string): Promise<ICandidate | null> {
    return await this.dataAccess.getCandidateByEmail(email);
  }

  async getAllCandidates(): Promise<ICandidate[]> {
    return await this.dataAccess.getAllCandidates();
  }

  async deleteCandidate(email: string): Promise<void> {
    return await this.dataAccess.deleteCandidate(email);
  }
}

export default CandidateService;
