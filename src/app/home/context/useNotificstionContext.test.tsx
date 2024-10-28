import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NotificationContext } from "./NotificationContext";
import useNotificationContext from "./useNotificationContext";
import { ReactNode } from "react";

const NotificationContextProvider = ({ children }: { children: ReactNode }) => {
  const contextValue: [{ isOpen: boolean; message: string }, () => void] = [
    { isOpen: false, message: "" },
    vi.fn(),
  ];
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

describe("useNotificationContext Hook", () => {
  let renderUseNotificationContext: () => ReturnType<typeof renderHook>;

  beforeEach(() => {
    renderUseNotificationContext = () =>
      renderHook(() => useNotificationContext(), {
        wrapper: NotificationContextProvider,
      });
  });

  it("should throw an error when used outside of NotificationContextProvider", () => {
    expect(() => renderHook(() => useNotificationContext())).toThrow(
      "useNotificationContext must be used within a NotificationContextProvider"
    );
  });

  it("should return context value when used within NotificationContextProvider", () => {
    const { result } = renderUseNotificationContext();

    expect(result.current).toEqual([
      { isOpen: false, message: "" },
      expect.any(Function),
    ]);
  });
});
