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
  it("throws an error when used outside of NotificationContextProvider", () => {
    try {
      renderHook(() => useNotificationContext());
    } catch (error) {
      expect(error).toEqual(
        new Error(
          "useNotificationContext must be used within a NotificationContextProvider"
        )
      );
    }
  });

  it("returns context value when used within NotificationContextProvider", () => {
    const { result } = renderHook(() => useNotificationContext(), {
      wrapper: NotificationContextProvider,
    });

    expect(result.current).toEqual([
      { isOpen: false, message: "" },
      expect.any(Function),
    ]);
  });
});
