import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Error } from "./Error";

describe("Error Component", () => {
  it("renders the error message", () => {
    render(<Error />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(
      screen.getByText("Oops... Something went wrong")
    ).toBeInTheDocument();
    expect(screen.getByText("Please Try Again")).toBeInTheDocument();
  });

  it("reloads the page when the button is clicked", () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });

    render(<Error />);

    fireEvent.click(screen.getByText("Please Try Again"));

    expect(reloadMock).toHaveBeenCalled();
  });
});
