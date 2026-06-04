import axios from "axios";
import type { Movie } from "../types/movie";

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number; // Оновлюємо інтерфейс згідно з ТЗ
  total_results: number;
}

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

// Змінюємо тип повернення з Movie[] на TMDBResponse
export const fetchMovies = async (
  query: string,
  page: number = 1,
): Promise<TMDBResponse> => {
  const token =
    import.meta.env.VITE_TMDB_TOKEN ||
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDA1YmQ0ODhmNWVmNmM1NmJjZjhiOWUzNjRhMWEzNCIsIm5iZiI6MTc4MDUxNDg3OS45NTksInN1YiI6IjZhMjA4MDNmNjljZjFjMmQwM2Q2ODZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._V8XsrDDBP2yDES3oYUojm4MlYjqPicmwgTtBkRkYRk";

  const config = {
    params: {
      query,
      page, // Додаємо обов'язаковий параметр сторінки
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
  return response.data; // Повертаємо всю дату (там є і results, і total_pages)
};
