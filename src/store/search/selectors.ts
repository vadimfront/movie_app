import type { RootState } from "../index";

export const selectSearchQuery = (state: RootState) => state.search.query;
export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSearchIsLoading = (state: RootState) =>
  state.search.isLoading;
export const selectSearchError = (state: RootState) => state.search.error;
export const selectIsRateLimited = (state: RootState) =>
  state.search.isRateLimited;
