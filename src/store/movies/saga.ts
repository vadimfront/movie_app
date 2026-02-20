import type { PayloadAction } from "@reduxjs/toolkit";
import type { Movie, PaginatedResponse } from "../../types/movie";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getMovieDetails,
} from "../../api/tmdb";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  MOVIES_FETCH_NOW_PLAYING_REQUEST,
  MOVIES_FETCH_POPULAR_REQUEST,
  MOVIES_FETCH_SUCCESS,
  MOVIES_DETAILS_SUCCESS,
  MOVIES_FETCH_DETAILS_REQUEST,
} from "./actionTypes";

function* handleFetchPopular(action: PayloadAction<{ page: number }>) {
  try {
    const data: PaginatedResponse<Movie> = yield call(
      getPopularMovies,
      action.payload.page,
    );
    yield put({
      type: MOVIES_FETCH_SUCCESS,
      payload: {
        movies: data.results,
        page: data.page,
        totalPages: data.total_pages,
      },
    });
  } catch (error) {
    yield put({ type: "MOVIES_FETCH_FAILURE", payload: error });
  }
}

function* handleFetchNowPlaying(action: {
  type: string;
  payload: { page: number };
}) {
  try {
    const data: PaginatedResponse<Movie> = yield call(
      getNowPlayingMovies,
      action.payload.page,
    );
    yield put({
      type: MOVIES_FETCH_SUCCESS,
      payload: {
        movies: data.results ?? [],
        page: data.page ?? 1,
        totalPages: data.total_pages ?? 1,
      },
    });
  } catch (error) {
    yield put({ type: "MOVIES_FETCH_FAILURE", payload: error });
  }
}

function* handleFetchMovieDetails(action: PayloadAction<number>) {
  try {
    const data: Movie = yield call(getMovieDetails, action.payload);
    yield put({ type: MOVIES_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: "MOVIES_DETAILS_FAILURE", payload: error });
  }
}

export function* moviesSaga() {
  yield takeLatest(MOVIES_FETCH_POPULAR_REQUEST, handleFetchPopular);
  yield takeLatest(MOVIES_FETCH_NOW_PLAYING_REQUEST, handleFetchNowPlaying);
  yield takeLatest(MOVIES_FETCH_DETAILS_REQUEST, handleFetchMovieDetails);
}
