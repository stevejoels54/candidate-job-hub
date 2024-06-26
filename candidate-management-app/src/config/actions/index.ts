import { ICandidate, IError } from "../../types";

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
  UPDATE_CANDIDATE_DATA: "UPDATE_CANDIDATE_DATA",

  DELETE_CANDIDATE_LOADING: "DELETE_CANDIDATE_LOADING",
  DELETE_CANDIDATE_SUCCESS: "DELETE_CANDIDATE_SUCCESS",
  DELETE_CANDIDATE_ERROR: "DELETE_CANDIDATE_ERROR",

  // UI actions
  ADD_CANDIDATE_MODAL_VISIBLE: "ADD_CANDIDATE_MODAL_VISIBLE",
  UPDATE_CANDIDATE_MODAL_VISIBLE: "UPDATE_CANDIDATE_MODAL_VISIBLE",
  CANDIDATE_DETAILS_MODAL_VISIBLE: "CANDIDATE_DETAILS_MODAL_VISIBLE",

  // service actions
  SERVER_LOADING: "SERVER_LOADING",
  SERVER_ERROR: "SERVER_ERROR",
  SERVER_SUCCESS: "SERVER_SUCCESS",

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

  setUpdateCandidateData: (candidate: ICandidate) => ({
    type: actions.UPDATE_CANDIDATE_DATA,
    candidate,
  }),

  deleteCandidate: (email: string) => ({
    type: actions.DELETE_CANDIDATE_LOADING,
    email,
  }),

  // UI actions
  showAddCandidateModal: () => ({
    type: actions.ADD_CANDIDATE_MODAL_VISIBLE,
  }),

  showUpdateCandidateModal: () => ({
    type: actions.UPDATE_CANDIDATE_MODAL_VISIBLE,
  }),

  showCandidateDetailsModal: () => ({
    type: actions.CANDIDATE_DETAILS_MODAL_VISIBLE,
  }),

  // service actions
  serverLoading: () => ({
    type: actions.SERVER_LOADING,
  }),

  serverError: (error: IError) => ({
    type: actions.SERVER_ERROR,
    error,
  }),

  serverSuccess: (message: string) => ({
    type: actions.SERVER_SUCCESS,
    message,
  }),
};
