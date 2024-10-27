import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import useGetMovies from "./useGetMovies";
import { fetchMovies } from "../../../modules/fetch/movies";
import { mockMovies } from "../../../modules/__mocks__/movies";

vi.mock("../../../modules/fetch/movies");

const mockFetchMovies = fetchMovies as MockedFunction<typeof fetchMovies>;

describe("useGetMovies Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles error correctly", async () => {
    mockFetchMovies.mockRejectedValue(new Error("Test Error"));

    const { result } = renderHook(() => useGetMovies());

    await waitFor(() => expect(result.current.error).toBeDefined());

    expect(result.current.data).toBeUndefined();
    expect(mockFetchMovies).toHaveBeenCalled();
  });

  it("fetches movies successfully", async () => {
    mockFetchMovies.mockResolvedValue(mockMovies);

    const { result } = renderHook(() => useGetMovies());

    await waitFor(() => expect(result.current.data).toEqual(mockMovies));

    expect(result.current.error).toBeUndefined();
    expect(mockFetchMovies).toHaveBeenCalled();
  });
});
