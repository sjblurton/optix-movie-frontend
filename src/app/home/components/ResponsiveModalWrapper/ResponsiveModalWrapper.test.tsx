import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import ResponsiveModalWrapper from "./ResponsiveModalWrapper";
import { useMediaQuery } from "@mui/material";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

const mockUseMediaQuery = useMediaQuery as MockedFunction<typeof useMediaQuery>;

describe("ResponsiveModalWrapper Component", () => {
  it("renders modal on mobile devices", () => {
    mockUseMediaQuery.mockReturnValue(true);

    render(
      <ResponsiveModalWrapper isOpen={true} handleClose={vi.fn()}>
        <div>Modal Content</div>
      </ResponsiveModalWrapper>
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("renders children directly on larger screens", () => {
    mockUseMediaQuery.mockReturnValue(false);

    render(
      <ResponsiveModalWrapper isOpen={true} handleClose={vi.fn()}>
        <div>Modal Content</div>
      </ResponsiveModalWrapper>
    );

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls handleClose when modal is closed", () => {
    mockUseMediaQuery.mockReturnValue(true);
    const handleClose = vi.fn();

    render(
      <ResponsiveModalWrapper isOpen={true} handleClose={handleClose}>
        <div>Modal Content</div>
      </ResponsiveModalWrapper>
    );

    const backdrop = document.querySelector(".MuiBackdrop-root");
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(handleClose).toHaveBeenCalled();
  });
});
