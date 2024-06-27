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

export interface IError {
  status: number;
  message: string;
}

export interface IState {
  candidatesLoading: boolean;
  candidatesSuccess: ICandidate[];
  candidatesError: IError;

  candidateLoading: boolean;
  candidateSuccess: ICandidate;
  candidateError: IError;

  addCandidateLoading: boolean;
  addCandidateSuccess: ICandidate;
  addCandidateError: IError;

  updateCandidateLoading: boolean;
  updateCandidateSuccess: ICandidate;
  updateCandidateError: IError;

  deleteCandidateLoading: boolean;
  deleteCandidateSuccess: ICandidate;
  deleteCandidateError: IError;
}
