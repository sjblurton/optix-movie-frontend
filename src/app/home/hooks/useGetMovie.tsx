import useSWR from "swr";
import { fetchMovie } from "../../../modules/fetch/movies";

function useGetMovie(id: string | null) {
  return useSWR(`/movies/${id}`, () => (id ? fetchMovie(id) : null), {
    shouldRetryOnError: true,
    errorRetryCount: 3,
  });
}

export default useGetMovie;
