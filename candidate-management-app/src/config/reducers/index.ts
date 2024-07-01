import { actions } from "../actions";
import { initialState } from "../initialState";
import { IError, ICandidate } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_CANDIDATES_LOADING:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          candidatesLoading: true,
          candidatesError: {} as IError,
        },
      };
    case actions.GET_CANDIDATES_SUCCESS:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          candidatesLoading: false,
          candidatesSuccess: action.candidates,
        },
      };
    case actions.GET_CANDIDATES_ERROR:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          candidatesLoading: false,
          candidatesError: action.error,
        },
      };
    case actions.GET_CANDIDATE_LOADING:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          candidateLoading: true,
          candidateError: {} as IError,
          candidateSuccess: {} as ICandidate,
        },
      };
    case actions.GET_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          candidateLoading: false,
          candidateSuccess: action.candidate,
        },
      };
    case actions.GET_CANDIDATE_ERROR:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          candidateLoading: false,
          candidateError: action.error,
        },
      };
    case actions.ADD_CANDIDATE_LOADING:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          addCandidateLoading: true,
          addCandidateError: {} as IError,
          addCandidateSuccess: {} as ICandidate,
        },
      };
    case actions.ADD_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          addCandidateLoading: false,
          addCandidateSuccess: action.candidate,
          candidatesSuccess: [
            action.candidate,
            // if email of new candidate is same as existing candidate, update the existing candidate else add the new candidate
            ...state.candidate.candidatesSuccess.filter(
              (candidate) => candidate.email !== action.candidate.email
            ),
          ],
        },
      };
    case actions.ADD_CANDIDATE_ERROR:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          addCandidateLoading: false,
          addCandidateError: action.error,
        },
      };
    case actions.UPDATE_CANDIDATE_LOADING:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          updateCandidateLoading: true,
          updateCandidateError: {} as IError,
          updateCandidateSuccess: {} as ICandidate,
        },
      };
    case actions.UPDATE_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          updateCandidateLoading: false,
          updateCandidateSuccess: action.candidate,
          candidatesSuccess: state.candidate.candidatesSuccess.map(
            (candidate) =>
              candidate.email === action.candidate.email
                ? action.candidate
                : candidate
          ),
        },
      };
    case actions.UPDATE_CANDIDATE_ERROR:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          updateCandidateLoading: false,
          updateCandidateError: action.error,
        },
      };
    case actions.UPDATE_CANDIDATE_DATA:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          updateCandidateData: action.candidate,
        },
      };
    case actions.DELETE_CANDIDATE_LOADING:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          deleteCandidateLoading: true,
          deleteCandidateError: {} as IError,
          deleteCandidateSuccess: {} as ICandidate,
        },
      };
    case actions.DELETE_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          deleteCandidateLoading: false,
          deleteCandidateSuccess: action.candidate,
          candidatesSuccess: state.candidate.candidatesSuccess.filter(
            (candidate) => candidate.email !== action.email
          ),
        },
      };
    case actions.DELETE_CANDIDATE_ERROR:
      return {
        ...state,
        candidate: {
          ...state.candidate,
          deleteCandidateLoading: false,
          deleteCandidateError: action.error,
        },
      };

    case actions.ADD_CANDIDATE_MODAL_VISIBLE:
      return {
        ...state,
        appUi: {
          ...state.appUi,
          addCandidateModalVisible: !state.appUi.addCandidateModalVisible,
        },
      };
    case actions.UPDATE_CANDIDATE_MODAL_VISIBLE:
      return {
        ...state,
        appUi: {
          ...state.appUi,
          updateCandidateModalVisible: !state.appUi.updateCandidateModalVisible,
        },
      };
    case actions.CANDIDATE_DETAILS_MODAL_VISIBLE:
      return {
        ...state,
        appUi: {
          ...state.appUi,
          candidateDetailsModalVisible:
            !state.appUi.candidateDetailsModalVisible,
        },
      };
    case actions.SERVER_LOADING:
      return {
        ...state,
        server: {
          ...state.server,
          serverLoading: true,
          serverError: {} as IError,
        },
      };
    case actions.SERVER_SUCCESS:
      return {
        ...state,
        server: {
          ...state.server,
          serverLoading: false,
          serverSuccess: action.message,
        },
      };
    case actions.SERVER_ERROR:
      return {
        ...state,
        server: {
          ...state.server,
          serverLoading: false,
          serverError: action.error,
        },
      };
    default:
      return state;
  }
};
