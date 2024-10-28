import useSWR from "swr";
import { fetchMovies } from "../../../modules/fetch/movies";
import { useCallback } from "react";

function useGetMovies() {
  const fetcher = useCallback(() => fetchMovies(), []);

  return useSWR("/movies", fetcher, {
    shouldRetryOnError: true,
    errorRetryCount: 3,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}

export default useGetMovies;
