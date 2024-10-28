import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import Table from "./Table";
import useGetMovies from "../../hooks/useGetMovies";
import { mockUseGetMoviesReturn } from "../../../../modules/__mocks__/swr";

vi.mock("../../hooks/useGetMovies");

const mockUseGetMovies = useGetMovies as MockedFunction<typeof useGetMovies>;

describe("Table Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupMocks = (
    returnValue: Partial<ReturnType<typeof useGetMovies>>
  ) => {
    mockUseGetMovies.mockReturnValue({
      // @ts-expect-error - data is not used in this test
      data: null,
      error: null,
      isLoading: false,
      ...returnValue,
    });
  };

  it("should render loading state correctly", () => {
    setupMocks({ isLoading: true });

    render(<Table setSelectedMovieId={vi.fn()} />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should throw an error when there is an error", () => {
    setupMocks({ error: new Error("Test Error") });

    expect(() => render(<Table setSelectedMovieId={vi.fn()} />)).toThrow(
      "Test Error"
    );
  });

  it("should render data grid correctly", () => {
    setupMocks(mockUseGetMoviesReturn);

    const setSelectedMovieId = vi.fn();
    render(<Table setSelectedMovieId={setSelectedMovieId} />);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Movie 1"));
    expect(setSelectedMovieId).toHaveBeenCalledWith("1");
  });
});
