import { ICandidate } from "../../types";

export const actions = {
  GET_CANDIDATES_LOADING: "GET_CANDIDATES_LOADING",
  GET_CANDIDATES_SUCCESS: "GET_CANDIDATES_SUCCESS",
  GET_CANDIDATES_ERROR: "GET_CANDIDATES_ERROR",

  GET_CANDIDATE_LOADING: "GET_CANDIDATE_LOADING",
  GET_CANDIDATE_SUCCESS: "GET_CANDIDATE_SUCCESS",
  GET_CANDIDATE_ERROR: "GET_CANDIDATE_ERROR",

  ADD_CANDIDATE_LOADING: "ADD_CANDIDATE_LOADING",
  ADD_CANDIDATE_SUCCESS: "ADD_CANDIDATE_SUCCESS",
  ADD_CANDIDATE_ERROR: "ADD_CANDIDATE_ERROR",

  UPDATE_CANDIDATE_LOADING: "UPDATE_CANDIDATE_LOADING",
  UPDATE_CANDIDATE_SUCCESS: "UPDATE_CANDIDATE_SUCCESS",
  UPDATE_CANDIDATE_ERROR: "UPDATE_CANDIDATE_ERROR",

  DELETE_CANDIDATE_LOADING: "DELETE_CANDIDATE_LOADING",
  DELETE_CANDIDATE_SUCCESS: "DELETE_CANDIDATE_SUCCESS",
  DELETE_CANDIDATE_ERROR: "DELETE_CANDIDATE_ERROR",

  getCandidates: () => ({
    type: actions.GET_CANDIDATES_LOADING,
  }),

  getCandidate: (email: string) => ({
    type: actions.GET_CANDIDATE_LOADING,
    email,
  }),

  addCandidate: (candidate: ICandidate) => ({
    type: actions.ADD_CANDIDATE_LOADING,
    candidate,
  }),

  updateCandidate: (candidate: ICandidate) => ({
    type: actions.UPDATE_CANDIDATE_LOADING,
    candidate,
  }),

  deleteCandidate: (email: string) => ({
    type: actions.DELETE_CANDIDATE_LOADING,
    email,
  }),
};
