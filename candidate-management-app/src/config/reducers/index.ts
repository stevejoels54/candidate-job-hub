import { actions } from "../actions";
import { initialState } from "../initialState";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_CANDIDATES_LOADING:
      return {
        ...state,
        candidatesLoading: true,
      };
    case actions.GET_CANDIDATES_SUCCESS:
      return {
        ...state,
        candidatesLoading: false,
        candidatesSuccess: action.candidates,
      };
    case actions.GET_CANDIDATES_ERROR:
      return {
        ...state,
        candidatesLoading: false,
        candidatesError: action.error,
      };
    case actions.GET_CANDIDATE_LOADING:
      return {
        ...state,
        candidateLoading: true,
      };
    case actions.GET_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidateLoading: false,
        candidateSuccess: action.candidate,
      };
    case actions.GET_CANDIDATE_ERROR:
      return {
        ...state,
        candidateLoading: false,
        candidateError: action.error,
      };
    case actions.ADD_CANDIDATE_LOADING:
      return {
        ...state,
        addCandidateLoading: true,
      };
    case actions.ADD_CANDIDATE_SUCCESS:
      return {
        ...state,
        addCandidateLoading: false,
        addCandidateSuccess: action.candidate,
      };
    case actions.ADD_CANDIDATE_ERROR:
      return {
        ...state,
        addCandidateLoading: false,
        addCandidateError: action.error,
      };
    case actions.UPDATE_CANDIDATE_LOADING:
      return {
        ...state,
        updateCandidateLoading: true,
      };
    case actions.UPDATE_CANDIDATE_SUCCESS:
      return {
        ...state,
        updateCandidateLoading: false,
        updateCandidateSuccess: action.candidate,
      };
    case actions.UPDATE_CANDIDATE_ERROR:
      return {
        ...state,
        updateCandidateLoading: false,
        updateCandidateError: action.error,
      };
    case actions.DELETE_CANDIDATE_LOADING:
      return {
        ...state,
        deleteCandidateLoading: true,
      };
    case actions.DELETE_CANDIDATE_SUCCESS:
      return {
        ...state,
        deleteCandidateLoading: false,
        deleteCandidateSuccess: action.candidate,
      };
    case actions.DELETE_CANDIDATE_ERROR:
      return {
        ...state,
        deleteCandidateLoading: false,
        deleteCandidateError: action.error,
      };
    default:
      return state;
  }
};
