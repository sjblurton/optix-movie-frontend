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
    mockUseGetMovie.mockReturnValue(mockUseGetMovieReturn);
  });

  const renderForm = (selected: string | null) => {
    render(<Form selected={selected} />);
  };

  const fillAndSubmitForm = async (review: string) => {
    fireEvent.change(screen.getByLabelText("Review:"), {
      target: { value: review },
    });
    fireEvent.click(screen.getByText("Submit"));
  };

  it("renders the form with no selected movie", () => {
    mockUseGetMovie.mockReturnValue({ ...mockUseGetMovieReturn, data: null });

    renderForm(null);

    expect(screen.getByText("Please select a movie")).toBeInTheDocument();
  });

  it("should render the form with a selected movie", () => {
    renderForm("1");

    expect(screen.getByText("Selected movie: Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Please leave a review below")).toBeInTheDocument();
  });

  it("should handle form submission successfully", async () => {
    const mockOnSubmit = vi.fn();
    mockUseSubmit.mockReturnValue(() =>
      mockOnSubmit({
        review: "Great movie!",
        selected: "1",
      })
    );

    renderForm("1");

    fillAndSubmitForm("Great movie!");

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        review: "Great movie!",
        selected: "1",
      });
    });
  });

  it("should clear form when submission fails", async () => {
    const mockOnSubmit = vi.fn().mockReturnValue({
      message: "Sorry an error occurred, please try again",
    });

    mockUseSubmit.mockReturnValue(() =>
      mockOnSubmit({
        review: "Great movie!",
        selected: "1",
      })
    );

    renderForm("1");

    fillAndSubmitForm("Great movie!");

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        review: "Great movie!",
        selected: "1",
      });
    });

    expect(screen.queryByText("Great movie!")).not.toBeInTheDocument();
  });

  it("should throw an error when there is an error fetching the movie", () => {
    mockUseGetMovie.mockReturnValue({
      ...mockUseGetMovieReturn,
      data: null,
      error: new Error("Fetch error"),
    });

    expect(() => renderForm("1")).toThrow("Fetch error");
  });

  it("should display validation error when review is too short", async () => {
    renderForm("1");

    fillAndSubmitForm("A");

    await waitFor(() => {
      expect(
        screen.getByText("Review must be at least 3 characters long.")
      ).toBeInTheDocument();
    });
  });

  it("should display validation error when review is too long", async () => {
    renderForm("1");

    fillAndSubmitForm(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );

    await waitFor(() => {
      expect(
        screen.getByText("Review must be at most 100 characters long.")
      ).toBeInTheDocument();
    });
  });

  it("should display message 'Please select a movie' when no movie is selected", async () => {
    mockUseGetMovie.mockReturnValue({ ...mockUseGetMovieReturn, data: null });

    renderForm(null);

    expect(screen.queryByText("Submit")).not.toBeInTheDocument();

    expect(screen.getByText("Please select a movie")).toBeInTheDocument();
  });
});
