import { render, screen } from "@testing-library/react";
import NumberOfMovies from "./NumberOfMovies";
import { describe, it, expect } from "vitest";

describe("NumberOfMovies Component", () => {
  it("should render the number when provided", () => {
    render(<NumberOfMovies number={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should render a skeleton when number is undefined", () => {
    render(<NumberOfMovies number={undefined} />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });
});
