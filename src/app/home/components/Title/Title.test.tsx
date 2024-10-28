import { render, screen, fireEvent } from "@testing-library/react";
import Title from "./Title";
import useGetMovies from "../../hooks/useGetMovies";
import { vi, MockedFunction } from "vitest";
import { mockUseGetMoviesReturn } from "../../../../modules/__mocks__/swr";

vi.mock("../../hooks/useGetMovies");

const mockUseGetMovies = useGetMovies as MockedFunction<typeof useGetMovies>;

describe("Title Component", () => {
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

  it("should render correctly", () => {
    setupMocks(mockUseGetMoviesReturn);

    render(<Title />);

    expect(screen.getByText("Welcome to Movie database!")).toBeInTheDocument();
    expect(screen.getByText("Total movies displayed 1")).toBeInTheDocument();
  });

  it("should call mutate on button click", () => {
    const mockMutate = vi.fn();
    setupMocks({
      ...mockUseGetMoviesReturn,
      mutate: mockMutate,
    });

    render(<Title />);

    fireEvent.click(screen.getByText("Refresh"));

    expect(mockMutate).toHaveBeenCalled();
  });

  it("should throw error when there is an error", () => {
    setupMocks({
      ...mockUseGetMoviesReturn,
      error: new Error("Test Error"),
    });

    expect(() => render(<Title />)).toThrow("Test Error");
  });
});
