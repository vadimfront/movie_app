export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
}

export interface MoviesState {
  movies: Movie[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number | null;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  spoken_languages: { english_name: string; name: string }[];
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type Category = "popular" | "now_playing" | "favorites";

export const CATEGORY_TYPES = {
  popular: "popular",
  now_playing: "now_playing",
  favorites: "favorites",
} as const;
