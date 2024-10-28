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
  let renderWithProvider: (component: React.ReactNode) => void;

  beforeEach(() => {
    renderWithProvider = (component: React.ReactNode) => {
      render(
        <NotificationContextProvider>{component}</NotificationContextProvider>
      );
    };
  });

  it("should provide the default context value", () => {
    renderWithProvider(<TestComponent />);

    expect(screen.getByTestId("test-div")).toBeInTheDocument();
  });

  it("should throw an error when used outside of NotificationContextProvider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useNotificationContext must be used within a NotificationContextProvider"
    );
  });

  it("should update the context value", async () => {
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

    renderWithProvider(<TestComponentWithUpdate />);

    expect(screen.getByTestId("test-div")).toHaveTextContent("");

    const button = screen.getByText("Update Message");
    button.click();

    await waitFor(() => {
      expect(screen.getByText("Updated Message")).toBeInTheDocument();
    });
  });
});
