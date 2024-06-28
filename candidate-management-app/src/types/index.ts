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
  status?: number;
  code?: string;
  message: string;
}

export interface IState {
  candidate: {
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
    updateCandidateData: ICandidate;

    deleteCandidateLoading: boolean;
    deleteCandidateSuccess: ICandidate;
    deleteCandidateError: IError;
  };

  appUi: {
    addCandidateModalVisible: boolean;
    updateCandidateModalVisible: boolean;
    candidateDetailsModalVisible: boolean;
  };
}
