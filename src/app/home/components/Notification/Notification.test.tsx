import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import Notification from "./Notification";
import useNotificationContext from "../../context/useNotificationContext";

vi.mock("../../context/useNotificationContext");

const mockUseNotificationContext = useNotificationContext as MockedFunction<
  typeof useNotificationContext
>;

describe("Notification Component", () => {
  it("renders notification when open", () => {
    mockUseNotificationContext.mockReturnValue([
      { isOpen: true, message: "Test Message" },
      vi.fn(),
    ]);

    render(<Notification />);

    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("does not render notification when closed", () => {
    mockUseNotificationContext.mockReturnValue([
      { isOpen: false, message: null },
      vi.fn(),
    ]);

    render(<Notification />);

    expect(screen.queryByText("Test Message")).not.toBeInTheDocument();
  });

  it("calls handleClose when notification is clicked", () => {
    const setState = vi.fn();
    mockUseNotificationContext.mockReturnValue([
      { isOpen: true, message: "Test Message" },
      setState,
    ]);

    render(<Notification />);

    fireEvent.click(screen.getByText("Test Message"));

    expect(setState).toHaveBeenCalledWith({ isOpen: false, message: null });
  });
});
