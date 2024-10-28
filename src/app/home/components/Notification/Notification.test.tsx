import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import Notification from "./Notification";
import useNotificationContext from "../../context/useNotificationContext";

vi.mock("../../context/useNotificationContext");

const mockUseNotificationContext = useNotificationContext as MockedFunction<
  typeof useNotificationContext
>;

describe("Notification Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderNotification = (
    isOpen: boolean,
    message: string | null,
    setState = vi.fn()
  ) => {
    mockUseNotificationContext.mockReturnValue([{ isOpen, message }, setState]);

    render(<Notification />);
  };

  it("should render notification when open", () => {
    renderNotification(true, "Test Message");

    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("should not render notification when closed", () => {
    renderNotification(false, null);

    expect(screen.queryByText("Test Message")).not.toBeInTheDocument();
  });

  it("should call handleClose when notification is clicked", () => {
    const setState = vi.fn();

    renderNotification(true, "Test Message", setState);

    fireEvent.click(screen.getByText("Test Message"));

    expect(setState).toHaveBeenCalledWith({ isOpen: false, message: null });
  });
});
