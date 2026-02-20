import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!BASE_URL || !API_KEY) {
  console.error(
    "Missing required environment variables: VITE_BASE_URL and/or VITE_TMDB_API_KEY",
  );
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY || ""}`,
  },
});

export default axiosInstance;
