import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../../types/movie";

interface SearchState {
  query: string;
  results: Movie[];
  isLoading: boolean;
  error: string | null;
  isRateLimited: boolean;
}

const initialState: SearchState = {
  query: "",
  results: [],
  isLoading: false,
  error: null,
  isRateLimited: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    searchRequest(state) {
      state.isLoading = true;
      state.error = null;
      state.isRateLimited = false;
    },
    searchSuccess(state, action: PayloadAction<Movie[]>) {
      state.results = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    searchFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setRateLimited(state, action: PayloadAction<boolean>) {
      state.isRateLimited = action.payload;
      state.isLoading = false;
    },
    clearSearch(state) {
      state.query = "";
      state.results = [];
      state.error = null;
      state.isRateLimited = false;
    },
  },
});

export const {
  setQuery,
  searchRequest,
  searchSuccess,
  searchFailure,
  setRateLimited,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
