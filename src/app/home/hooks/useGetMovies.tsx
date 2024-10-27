import useSWR from "swr";
import { fetchMovies } from "../../../modules/fetch/movies";

function useGetMovies() {
  return useSWR("/movies", () => fetchMovies(), {
    shouldRetryOnError: true,
    errorRetryCount: 3,
  });
}

export default useGetMovies;
