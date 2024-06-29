/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { actions } from "../actions";
import { AxiosResponse } from "axios";
import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// function to get all candidates
function* getCandidates() {
  try {
    const response: AxiosResponse = yield axios.get(
      `${baseUrl}/api/candidates`
    );
    yield put({
      type: actions.GET_CANDIDATES_SUCCESS,
      candidates: response.data,
    });
  } catch (error) {
    yield put({ type: actions.GET_CANDIDATES_ERROR, error });
  }
}

// function to get a single candidate
function* getCandidate(action: any) {
  try {
    const response: AxiosResponse = yield axios.get(
      `${baseUrl}/api/candidates/${action.email}`
    );
    yield put({
      type: actions.GET_CANDIDATE_SUCCESS,
      candidate: response.data,
    });
  } catch (error) {
    yield put({ type: actions.GET_CANDIDATE_ERROR, error });
  }
}

// function to add a candidate
function* addCandidate(action: any) {
  try {
    const response: AxiosResponse = yield axios.post(
      `${baseUrl}/api/candidates`,
      action.candidate
    );
    yield put({
      type: actions.ADD_CANDIDATE_SUCCESS,
      candidate: response.data,
    });
  } catch (error) {
    yield put({ type: actions.ADD_CANDIDATE_ERROR, error });
  }
}

// function to update a candidate
function* updateCandidate(action: any) {
  try {
    const response: AxiosResponse = yield axios.put(
      `${baseUrl}/api/candidates`,
      action.candidate
    );
    yield put({
      type: actions.UPDATE_CANDIDATE_SUCCESS,
      candidate: response.data,
    });
  } catch (error: any) {
    yield put({
      type: actions.UPDATE_CANDIDATE_ERROR,
      error: {
        message:
          error.response.data.error || error.message || "An error occurred",
      },
    });
  }
}

// function to delete a candidate
function* deleteCandidate(action: any) {
  try {
    yield axios.delete(`${baseUrl}/api/candidates/${action.email}`);
    yield put({ type: actions.DELETE_CANDIDATE_SUCCESS, email: action.email });
  } catch (error) {
    yield put({ type: actions.DELETE_CANDIDATE_ERROR, error });
  }
}

// watcher saga
function* watchGetCandidates() {
  yield takeLatest(actions.GET_CANDIDATES_LOADING, getCandidates);
}

// watcher saga
function* watchGetCandidate() {
  yield takeLatest(actions.GET_CANDIDATE_LOADING, getCandidate);
}

// watcher saga
function* watchAddCandidate() {
  yield takeLatest(actions.ADD_CANDIDATE_LOADING, addCandidate);
}

// watcher saga
function* watchUpdateCandidate() {
  yield takeLatest(actions.UPDATE_CANDIDATE_LOADING, updateCandidate);
}

// watcher saga
function* watchDeleteCandidate() {
  yield takeLatest(actions.DELETE_CANDIDATE_LOADING, deleteCandidate);
}

// root saga
export default function* rootSaga() {
  yield fork(watchGetCandidates);
  yield fork(watchGetCandidate);
  yield fork(watchAddCandidate);
  yield fork(watchUpdateCandidate);
  yield fork(watchDeleteCandidate);
}
