import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotificationContextProvider, {
  NotificationContext,
} from "./NotificationContext";
import { useContext } from "react";

const TestComponent = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationContextProvider"
    );
  }
  const [state] = context;
  return <div data-testid="test-div">{state.message}</div>;
};

describe("NotificationContextProvider", () => {
  it("provides the default context value", () => {
    render(
      <NotificationContextProvider>
        <TestComponent />
      </NotificationContextProvider>
    );

    expect(screen.getByTestId("test-div")).toBeInTheDocument();
  });

  it("throws an error when used outside of NotificationContextProvider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useNotificationContext must be used within a NotificationContextProvider"
    );
  });

  it("updates the context value", () => {
    const TestComponentWithUpdate = () => {
      const context = useContext(NotificationContext);
      if (!context) {
        throw new Error(
          "useNotificationContext must be used within a NotificationContextProvider"
        );
      }
      const [state, setState] = context;
      return (
        <div>
          <div data-testid="test-div">{state.message}</div>
          <button
            onClick={() =>
              setState({ isOpen: true, message: "Updated Message" })
            }
          >
            Update Message
          </button>
        </div>
      );
    };

    render(
      <NotificationContextProvider>
        <TestComponentWithUpdate />
      </NotificationContextProvider>
    );

    expect(screen.getByTestId("test-div")).toHaveTextContent("");

    const button = screen.getByText("Update Message");
    button.click();

    waitFor(() => {
      expect(screen.getByText("Updated Message")).toBeInTheDocument();
    });
  });
});
