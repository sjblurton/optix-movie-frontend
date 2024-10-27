import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedFunction, describe, it, expect, vi } from "vitest";
import HomePage from "./Page";
import useGetMovies from "./hooks/useGetMovies";
import useNotificationContext from "./context/useNotificationContext";
import { fetchMovie, updateMovie } from "../../modules/fetch/movies";
import { mockUseGetMoviesReturn } from "../../modules/__mocks__/swr";
import { mockMovie } from "../../modules/__mocks__/movies";

vi.mock("./hooks/useGetMovies");
vi.mock("./context/useNotificationContext");
vi.mock("../../modules/fetch/movies", () => ({
  fetchMovie: vi.fn(),
  updateMovie: vi.fn(),
}));

const mockUseGetMovies = useGetMovies as MockedFunction<typeof useGetMovies>;
const mockUseNotificationContext = useNotificationContext as MockedFunction<
  typeof useNotificationContext
>;
const mockFetchMovie = fetchMovie as MockedFunction<typeof fetchMovie>;
const mockUpdateMovie = updateMovie as MockedFunction<typeof updateMovie>;

describe("HomePage Integration Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the HomePage and interacts with components", async () => {
    const mockSetState = vi.fn();

    mockUseGetMovies.mockReturnValue(mockUseGetMoviesReturn);
    mockUseNotificationContext.mockReturnValue([
      {
        isOpen: true,
        message: "Movie updated successfully",
      },
      mockSetState,
    ]);
    mockFetchMovie.mockResolvedValue(mockMovie);
    mockUpdateMovie.mockResolvedValue({
      message: "Movie updated successfully",
    });

    render(<HomePage />);

    expect(screen.getByText("Title")).toBeInTheDocument();

    expect(screen.getByText("Movie 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Movie 1"));

    await waitFor(() => {
      expect(screen.getByText("Selected movie: Movie 1")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Review:"), {
      target: { value: "Great movie!" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockUpdateMovie).toHaveBeenCalledWith("1", "Great movie!");
    });

    await waitFor(() => {
      expect(screen.getByTestId("notification-snackbar")).toBeInTheDocument();
    });
  });

  it("handles error state correctly", async () => {
    mockUseGetMovies.mockReturnValue({
      ...mockUseGetMoviesReturn,
      error: new Error("Failed to fetch movies"),
      data: undefined,
    });

    render(<HomePage />);

    expect(
      screen.getByText("Oops... Something went wrong")
    ).toBeInTheDocument();
  });
});
