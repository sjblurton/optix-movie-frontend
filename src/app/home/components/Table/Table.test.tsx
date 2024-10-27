import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import Table from "./Table";
import useGetMovies from "../../hooks/useGetMovies";
import { mockUseGetMoviesReturn } from "../../../../modules/__mocks__/swr";

vi.mock("../../hooks/useGetMovies");

const mockUseGetMovies = useGetMovies as MockedFunction<typeof useGetMovies>;

describe("Table Component", () => {
  it("renders loading state correctly", () => {
    mockUseGetMovies.mockReturnValue({
      // @ts-expect-error - data is not used in this test
      data: null,
      error: null,
      isLoading: true,
    });

    render(<Table setSelected={vi.fn()} />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("throws an error when there is an error", () => {
    mockUseGetMovies.mockReturnValue({
      // @ts-expect-error - data is not used in this test
      data: null,
      error: new Error("Test Error"),
      isLoading: false,
    });

    expect(() => render(<Table setSelected={vi.fn()} />)).toThrow("Test Error");
  });

  it("renders data grid correctly", () => {
    mockUseGetMovies.mockReturnValue(mockUseGetMoviesReturn);

    const setSelected = vi.fn();
    render(<Table setSelected={setSelected} />);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Movie 1"));
    expect(setSelected).toHaveBeenCalledWith("1");
  });
});
