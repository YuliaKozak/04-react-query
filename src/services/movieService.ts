import axios from "axios";
import type { Movie } from "../types/movie";

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_results: number;
}

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const config = {
    params: {
      query,
      language: "en-EN",
      include_adult: "false",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await movieInstance.get<TMDBResponse>(
    "/search/movie",
    config,
  );
  return response.data.results;
};
