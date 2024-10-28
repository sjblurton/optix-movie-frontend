import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import { UseFormReset } from "react-hook-form";
import useSubmit from "./useSubmit";
import { updateMovie } from "../../../../../modules/fetch/movies";
import useNotificationContext from "../../../context/useNotificationContext";
import useGetMovies from "../../../hooks/useGetMovies";
import { FormValues } from "../@types/form-types";
import { mockUseGetMoviesReturn } from "../../../../../modules/__mocks__/swr";

vi.mock("../../../../../modules/fetch/movies");
vi.mock("../../../context/useNotificationContext");
vi.mock("../../../hooks/useGetMovies");

const mockUpdateMovie = updateMovie as MockedFunction<typeof updateMovie>;

const mockUseNotificationContext = useNotificationContext as MockedFunction<
  typeof useNotificationContext
>;

const mockUseGetMovies = useGetMovies as MockedFunction<typeof useGetMovies>;

const mockState = { isOpen: false, message: null };

describe("useSubmit Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupMocks = () => {
    const mockReset = vi.fn() as UseFormReset<FormValues>;
    const mockMutate = vi.fn();
    const mockSetState = vi.fn();

    mockUseNotificationContext.mockReturnValue([mockState, mockSetState]);
    mockUseGetMovies.mockReturnValue({
      ...mockUseGetMoviesReturn,
      mutate: mockMutate,
    });

    return { mockReset, mockMutate, mockSetState };
  };

  it("should submit the form successfully", async () => {
    const { mockReset, mockMutate, mockSetState } = setupMocks();

    mockUpdateMovie.mockResolvedValue({
      message: "Movie updated successfully",
    });

    mockUseGetMovies.mockReturnValue({
      ...mockUseGetMoviesReturn,
      mutate: mockMutate,
    });

    const { result } = renderHook(() => useSubmit(mockReset));

    await act(async () => {
      const response = await result.current({
        review: "Great movie!",
        selectedMovieId: "1",
      });
      expect(response).toEqual({ message: "Movie updated successfully" });
    });

    expect(mockReset).toHaveBeenCalled();
    expect(mockSetState).toHaveBeenCalledWith({
      isOpen: true,
      message: "Movie updated successfully",
    });
    expect(mockMutate).toHaveBeenCalled();
  });

  it("should handle error during form submission", async () => {
    const { mockReset, mockMutate, mockSetState } = setupMocks();

    mockUpdateMovie.mockRejectedValue(new Error("Failed to update movie"));

    const { result } = renderHook(() => useSubmit(mockReset));

    await act(async () => {
      try {
        await result.current({ review: "Great movie!", selectedMovieId: "1" });
      } catch (error) {
        expect(error).toEqual(new Error("Failed to update movie"));
      }
    });

    expect(mockSetState).not.toHaveBeenCalled();
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
