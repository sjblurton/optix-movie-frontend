import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import useGetMovie from "./useGetMovie";
import { fetchMovie } from "../../../modules/fetch/movies";
import { mockMovie } from "../../../modules/__mocks__/movies";

vi.mock("../../../modules/fetch/movies");

const mockFetchMovie = fetchMovie as MockedFunction<typeof fetchMovie>;

describe("useGetMovie Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles error correctly", async () => {
    mockFetchMovie.mockRejectedValue(new Error("Test Error"));

    const { result } = renderHook(() => useGetMovie("1"));

    await waitFor(() => expect(result.current.error).toBeDefined());
    expect(result.current.data).toBeUndefined();
    expect(mockFetchMovie).toHaveBeenCalledWith("1");
  });

  it("fetches movie successfully", async () => {
    mockFetchMovie.mockResolvedValue(mockMovie);

    const { result } = renderHook(() => useGetMovie("1"));

    await waitFor(() => expect(result.current.data).toEqual(mockMovie));
    expect(result.current.error).toBeUndefined();
    expect(mockFetchMovie).toHaveBeenCalledWith("1");
  });

  it("does not fetch movie when id is null", async () => {
    const { result } = renderHook(() => useGetMovie(null));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(mockFetchMovie).not.toHaveBeenCalled();
  });
});
