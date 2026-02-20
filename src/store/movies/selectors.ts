import type { RootState } from "../index";

export const selectMoviesItems = (state: RootState) => state.movies.movies;
export const selectMoviesPage = (state: RootState) => state.movies.page;
export const selectMoviesTotalPages = (state: RootState) =>
  state.movies.totalPages;
export const selectMoviesIsLoading = (state: RootState) =>
  state.movies.isLoading;
export const selectMoviesError = (state: RootState) => state.movies.error;
export const selectMovieDetails = (state: RootState) => state.movies.details;
export const selectMovieDetailsLoading = (state: RootState) =>
  state.movies.detailsLoading;
export const selectMovieDetailsError = (state: RootState) =>
  state.movies.detailsError;
