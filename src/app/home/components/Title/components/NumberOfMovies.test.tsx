import { render, screen } from "@testing-library/react";
import NumberOfMovies from "./NumberOfMovies";
import { describe, it, expect } from "vitest";

describe("NumberOfMovies Component", () => {
  it("renders the number when provided", () => {
    render(<NumberOfMovies number={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders a skeleton when number is undefined", () => {
    render(<NumberOfMovies number={undefined} />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });
});
