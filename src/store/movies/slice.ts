import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MoviesState, MovieDetails } from "../../types/movie";

const initialState: MoviesState & {
  details: MovieDetails | null;
  detailsLoading: boolean;
  detailsError: string | null;
} = {
  movies: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  details: null,
  detailsLoading: false,
  detailsError: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchPopularRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchNowPlayingRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchMovieDetailsRequest(state) {
      state.detailsLoading = true;
      state.detailsError = null;
    },
    fetchMovieDetailsSuccess(state, action: PayloadAction<MovieDetails>) {
      state.details = action.payload;
      state.detailsLoading = false;
    },
    fetchMovieDetailsFailure(state, action: PayloadAction<string>) {
      state.detailsLoading = false;
      state.detailsError = action.payload;
    },
    fetchMoviesSuccess(
      state,
      action: PayloadAction<{
        movies: MoviesState["movies"];
        page: number;
        totalPages: number;
      }>,
    ) {
      state.movies = action.payload.movies;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
      state.error = null;
    },
    fetchMoviesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetMovies(state) {
      state.movies = [];
      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
  },
});

export const {
  fetchPopularRequest,
  fetchNowPlayingRequest,
  fetchMovieDetailsRequest,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsFailure,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  resetMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
