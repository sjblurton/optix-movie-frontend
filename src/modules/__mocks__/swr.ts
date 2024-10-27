import { mockMovie, mockMovies } from "./movies";

export const mockUseGetMoviesReturn = {
  data: mockMovies,
  isLoading: false,
  isValidating: false,
  error: null,
  mutate: vi.fn(),
};

export const mockUseGetMovieReturn = {
  data: mockMovie,
  isLoading: false,
  isValidating: false,
  error: null,
  mutate: vi.fn(),
};
