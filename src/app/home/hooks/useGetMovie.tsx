import useSWR from "swr";
import { fetchMovie } from "../../../modules/fetch/movies";
import { useCallback } from "react";

function useGetMovie(id: string | null) {
  const fetcher = useCallback(() => (id ? fetchMovie(id) : null), [id]);

  return useSWR(`/movies/${id}`, fetcher, {
    shouldRetryOnError: true,
    errorRetryCount: 3,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}

export default useGetMovie;
