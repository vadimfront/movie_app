import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "./movies/slice";
import searchReducer from "./search/slice";
import favoritesReducer from "./favorites/slice";

export const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
  search: searchReducer,
});
