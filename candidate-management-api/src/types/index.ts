export interface ICandidate {
  id?: number; // For SQL
  _id?: string; // For MongoDB
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  callInterval?: string;
  linkedin?: string;
  github?: string;
  comment: string;
}

export interface IDataAccess {
  addOrUpdateCandidate(
    candidateData: ICandidate
  ): Promise<{ candidate: ICandidate; created: boolean }>;
  getCandidateByEmail(email: string): Promise<ICandidate | null>;
  getAllCandidates(): Promise<ICandidate[]>;
  deleteCandidate(email: string): Promise<void>;
}
