import {
  fetchPopularRequest,
  fetchNowPlayingRequest,
  fetchMovieDetailsRequest,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsFailure,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  resetMovies,
} from "./slice";

export const MOVIES_FETCH_POPULAR_REQUEST = fetchPopularRequest.type;
export const MOVIES_FETCH_NOW_PLAYING_REQUEST = fetchNowPlayingRequest.type;
export const MOVIES_FETCH_DETAILS_REQUEST = fetchMovieDetailsRequest.type;
export const MOVIES_DETAILS_SUCCESS = fetchMovieDetailsSuccess.type;
export const MOVIES_DETAILS_FAILURE = fetchMovieDetailsFailure.type;
export const MOVIES_FETCH_SUCCESS = fetchMoviesSuccess.type;
export const MOVIES_FETCH_FAILURE = fetchMoviesFailure.type;
export const MOVIES_RESET = resetMovies.type;
