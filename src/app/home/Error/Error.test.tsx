import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import Error from "./Error";

describe("Error Component", () => {
  let reloadMock: Mock;

  beforeEach(() => {
    reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });
  });

  it("should render the error message", () => {
    render(<Error />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(
      screen.getByText("Oops... Something went wrong")
    ).toBeInTheDocument();
    expect(screen.getByText("Please Try Again")).toBeInTheDocument();
  });

  it("should reload the page when the button is clicked", () => {
    render(<Error />);

    fireEvent.click(screen.getByText("Please Try Again"));

    expect(reloadMock).toHaveBeenCalled();
  });

  it("should render the custom error message", () => {
    render(<Error title="Custom Error" message="Custom Message" />);

    expect(screen.getByText("Custom Error")).toBeInTheDocument();
    expect(screen.getByText("Custom Message")).toBeInTheDocument();
  });
});
