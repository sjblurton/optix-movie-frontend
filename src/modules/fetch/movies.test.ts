import { describe, it, expect, vi, Mock } from "vitest";
import axios from "axios";
import { fetchMovies, fetchMovie, updateMovie } from "./movies";
import { moviesSchema, movieSchema } from "../model/movies";
import { mockMovie, mockMovies } from "../__mocks__/movies";

const https = "http://localhost:5000";
const baseUrl = "/api/v1/movies";

vi.mock("axios");

vi.mock("../model/movies", () => {
  return {
    moviesSchema: {
      parse: vi.fn(),
    },
    movieSchema: {
      parse: vi.fn(),
    },
  };
});

describe("fetchMovies", () => {
  it("fetches and processes movies correctly", async () => {
    const mockResponse = { data: mockMovies };
    (axios.get as Mock).mockResolvedValue(mockResponse);
    (moviesSchema.parse as Mock).mockReturnValue(mockMovies);

    const result = await fetchMovies();

    expect(result).toEqual(mockMovies);

    expect(axios.get).toHaveBeenCalledWith(`${https}${baseUrl}`);
    expect(moviesSchema.parse).toHaveBeenCalledWith(mockResponse.data);
  });

  it("throws an error when the request fails", async () => {
    (axios.get as Mock).mockRejectedValue(new Error("Network Error"));

    await expect(fetchMovies()).rejects.toThrow("Network Error");
  });
});

describe("fetchMovie", () => {
  it("fetches a movie correctly", async () => {
    const mockResponse = { data: mockMovie };
    (axios.get as Mock).mockResolvedValue(mockResponse);
    (movieSchema.parse as Mock).mockReturnValue(mockMovie);

    const result = await fetchMovie(mockMovie.id);

    expect(result).toEqual(mockMovie);

    expect(axios.get).toHaveBeenCalledWith(
      `${https}${baseUrl}/${mockMovie.id}`
    );
  });

  it("throws an error when the request fails", async () => {
    (axios.get as Mock).mockRejectedValue(new Error("Network Error"));

    await expect(fetchMovies()).rejects.toThrow("Network Error");
  });
});

describe("updateMovie", () => {
  it("updates a movie correctly", async () => {
    const review = "Good movie";
    const mockResponse = { data: { message: "Review added" } };
    (axios.put as Mock).mockResolvedValue(mockResponse);

    const result = await updateMovie(mockMovie.id, review);

    expect(result).toEqual({ message: "Review added" });

    expect(axios.put).toHaveBeenCalledWith(
      `${https}${baseUrl}/${mockMovie.id}`,
      {
        review,
      }
    );
  });

  it("returns an error message when the request fails", async () => {
    (axios.put as Mock).mockRejectedValue(new Error("Network Error"));

    const result = await updateMovie(mockMovie.id, "Good movie");

    expect(result).toEqual({
      message: "Sorry an error occurred, please try again",
    });
  });
});
