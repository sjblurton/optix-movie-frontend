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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderResponsiveModalWrapper = (
    isMobile: boolean,
    isOpen: boolean,
    handleClose = vi.fn()
  ) => {
    mockUseMediaQuery.mockReturnValue(isMobile);

    render(
      <ResponsiveModalWrapper isOpen={isOpen} handleClose={handleClose}>
        <div>Modal Content</div>
      </ResponsiveModalWrapper>
    );
  };

  it("renders modal on mobile devices", () => {
    renderResponsiveModalWrapper(true, true);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should render children directly on larger screens", () => {
    renderResponsiveModalWrapper(false, true);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should call handleClose when modal is closed", () => {
    const handleClose = vi.fn();

    renderResponsiveModalWrapper(true, true, handleClose);

    const backdrop = document.querySelector(".MuiBackdrop-root");
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(handleClose).toHaveBeenCalled();
  });
});
