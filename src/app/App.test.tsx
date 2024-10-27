import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import App from "./App";
import HomePage from "./home/Page";
import NotificationContextProvider from "./home/context/NotificationContext";

vi.mock("./home/Page");
vi.mock("./home/context/NotificationContext");

const mockHomePage = HomePage as MockedFunction<typeof HomePage>;
const mockNotificationContextProvider =
  NotificationContextProvider as MockedFunction<
    typeof NotificationContextProvider
  >;

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the App component with NotificationContextProvider and HomePage", () => {
    mockHomePage.mockReturnValue(<div>Mocked HomePage</div>);
    mockNotificationContextProvider.mockImplementation(({ children }) => (
      <div>Mocked NotificationContextProvider {children}</div>
    ));

    render(<App />);

    expect(
      screen.getByText("Mocked NotificationContextProvider")
    ).toBeInTheDocument();
    expect(screen.getByText("Mocked HomePage")).toBeInTheDocument();
  });
});
