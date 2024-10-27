import { render, screen, fireEvent } from "@testing-library/react";
import Title from "./Title";
import useGetMovies from "../../hooks/useGetMovies";
import { vi, MockedFunction } from "vitest";
import { mockUseGetMoviesReturn } from "../../../../modules/__mocks__/swr";

vi.mock("../../hooks/useGetMovies");

const mockUseGetMovies = useGetMovies as MockedFunction<typeof useGetMovies>;

describe("Title Component", () => {
  it("renders correctly", () => {
    mockUseGetMovies.mockReturnValue(mockUseGetMoviesReturn);

    render(<Title />);

    expect(screen.getByText("Welcome to Movie database!")).toBeInTheDocument();
    expect(screen.getByText("Total movies displayed 1")).toBeInTheDocument();
  });

  it("calls mutate on button click", () => {
    const mockMutate = vi.fn();
    mockUseGetMovies.mockReturnValue({
      ...mockUseGetMoviesReturn,
      mutate: mockMutate,
    });

    render(<Title />);

    fireEvent.click(screen.getByText("Refresh"));

    expect(mockMutate).toHaveBeenCalled();
  });

  it("throws error when there is an error", () => {
    mockUseGetMovies.mockReturnValue({
      ...mockUseGetMoviesReturn,
      // @ts-expect-error -- It's a test so I'm not concerned about the type
      data: null,
      error: new Error("Test Error"),
    });

    expect(() => render(<Title />)).toThrow("Test Error");
  });
});
