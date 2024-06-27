import { ICandidate, IError, IState } from "../../types";

// export const initialState = {
export const initialState: IState = {
  candidatesLoading: false,
  candidatesSuccess: [] as ICandidate[],
  candidatesError: {} as IError,

  candidateLoading: false,
  candidateSuccess: {} as ICandidate,
  candidateError: {} as IError,

  addCandidateLoading: false,
  addCandidateSuccess: {} as ICandidate,
  addCandidateError: {} as IError,

  updateCandidateLoading: false,
  updateCandidateSuccess: {} as ICandidate,
  updateCandidateError: {} as IError,

  deleteCandidateLoading: false,
  deleteCandidateSuccess: {} as ICandidate,
  deleteCandidateError: {} as IError,
};
