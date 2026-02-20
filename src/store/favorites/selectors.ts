import type { RootState } from "../index";

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectIsFavorite = (state: RootState, movieId: number) =>
  state.favorites.favorites.some((m) => m.id === movieId);
