import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import Form from "./Form";
import useGetMovie from "../../hooks/useGetMovie";
import useSubmit from "./hooks/useSubmit";
import { mockUseGetMovieReturn } from "../../../../modules/__mocks__/swr";

vi.mock("../../hooks/useGetMovie");
vi.mock("./hooks/useSubmit");

const mockUseGetMovie = useGetMovie as MockedFunction<typeof useGetMovie>;
const mockUseSubmit = useSubmit as MockedFunction<typeof useSubmit>;

describe("Form Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form with no selected movie", () => {
    mockUseGetMovie.mockReturnValue({ ...mockUseGetMovieReturn, data: null });

    render(<Form selected={null} />);

    expect(screen.getByText("Please select a movie")).toBeInTheDocument();
  });

  it("renders the form with a selected movie", () => {
    mockUseGetMovie.mockReturnValue(mockUseGetMovieReturn);

    render(<Form selected="1" />);

    expect(screen.getByText("Selected movie: Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Please leave a review below")).toBeInTheDocument();
  });

  it("handles form submission successfully", async () => {
    const mockOnSubmit = vi.fn();
    mockUseGetMovie.mockReturnValue(mockUseGetMovieReturn);
    mockUseSubmit.mockReturnValue(() =>
      mockOnSubmit({
        review: "Great movie!",
        selected: "1",
      })
    );

    render(<Form selected="1" />);

    fireEvent.change(screen.getByLabelText("Review:"), {
      target: { value: "Great movie!" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        review: "Great movie!",
        selected: "1",
      });
    });
  });

  it("clears form when submission fails", async () => {
    const mockOnSubmit = vi.fn().mockReturnValue({
      message: "Sorry an error occurred, please try again",
    });

    mockUseGetMovie.mockReturnValue(mockUseGetMovieReturn);
    mockUseSubmit.mockReturnValue(() =>
      mockOnSubmit({
        review: "Great movie!",
        selected: "1",
      })
    );

    render(<Form selected="1" />);

    fireEvent.change(screen.getByLabelText("Review:"), {
      target: { value: "Great movie!" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        review: "Great movie!",
        selected: "1",
      });
    });

    expect(screen.queryByText("Great movie!")).not.toBeInTheDocument();
  });

  it("throws an error when there is an error fetching the movie", () => {
    mockUseGetMovie.mockReturnValue({
      ...mockUseGetMovieReturn,
      data: null,
      error: new Error("Fetch error"),
    });

    expect(() => render(<Form selected="1" />)).toThrow("Fetch error");
  });

  it("displays validation error when review is too short", async () => {
    mockUseGetMovie.mockReturnValue(mockUseGetMovieReturn);

    render(<Form selected="1" />);

    fireEvent.change(screen.getByLabelText("Review:"), {
      target: { value: "Ba" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.getByText("Review must be at least 3 characters long")
      ).toBeInTheDocument();
    });
  });

  it("displays validation error when review is too long", async () => {
    mockUseGetMovie.mockReturnValue(mockUseGetMovieReturn);

    render(<Form selected="1" />);

    fireEvent.change(screen.getByLabelText("Review:"), {
      target: { value: "A".repeat(101) },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.getByText("Review must be at most 100 characters long")
      ).toBeInTheDocument();
    });
  });

  it("displays message 'Please select a movie' when no movie is selected", async () => {
    mockUseGetMovie.mockReturnValue({ ...mockUseGetMovieReturn, data: null });

    render(<Form selected={null} />);

    expect(screen.queryByText("Submit")).not.toBeInTheDocument();

    expect(screen.getByText("Please select a movie")).toBeInTheDocument();
  });
});
