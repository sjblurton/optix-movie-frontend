import axios from "axios";
import { movieSchema, moviesSchema } from "../model/movies";
import { z } from "zod";

const https =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_LOCAL_HOST_API;
const baseUrl = "/api/v1/movies";

export async function fetchMovies() {
  const response = await axios.get(`${https}${baseUrl}`);
  const movies = moviesSchema.parse(response.data);
  const processedMovies = movies.map((movie) => ({
    ...movie,
    averageReview: (
      movie.reviews.reduce((acc, i) => acc + i, 0) / movie.reviews.length
    ).toFixed(1),
  }));

  return processedMovies;
}

export async function fetchMovie(id: string) {
  const response = await axios.get(`${https}${baseUrl}/${id}`);
  return movieSchema.parse(response.data);
}

export async function updateMovie(id: string, review: string) {
  try {
    const response = await axios.put(`${https}${baseUrl}/${id}`, { review });
    return z
      .object({
        message: z.string(),
      })
      .parse(response.data);
  } catch {
    return { message: "Sorry an error occurred, please try again" };
  }
}
