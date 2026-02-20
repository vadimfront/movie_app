import axios from "axios";
import axiosInstance from "../axios/axios-instance";

export const getPopularMovies = async (page: number = 1) => {
  try {
    const response = await axiosInstance.get("/movie/popular", {
      params: {
        page: page,
      },
    });
    if (!response.data || !response.data.results) {
      throw new Error("Invalid response structure");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching popular movies:", error.message);
      throw new Error(`Failed to fetch popular movies: ${error.message}`);
    }
    throw error;
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    if (!response.data) {
      throw new Error("Invalid response structure");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error fetching movie details for ID ${movieId}:`,
        error.message,
      );
      throw new Error(`Failed to fetch movie details: ${error.message}`);
    }
    throw error;
  }
};

export const getNowPlayingMovies = async (page: number = 1) => {
  try {
    const response = await axiosInstance.get("/movie/now_playing", {
      params: {
        page: page,
      },
    });
    if (!response.data || !response.data.results) {
      throw new Error("Invalid response structure");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching now playing movies:", error.message);
      throw new Error(`Failed to fetch now playing movies: ${error.message}`);
    }
    throw error;
  }
};

export const searchMovies = async (query: string, page: number = 1) => {
  try {
    const response = await axiosInstance.get("/search/movie", {
      params: {
        query: query,
        page: page,
      },
    });
    if (!response.data || !response.data.results) {
      throw new Error("Invalid response structure");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error searching movies with query "${query}":`,
        error.message,
      );
      throw new Error(`Failed to search movies: ${error.message}`);
    }
    throw error;
  }
};
