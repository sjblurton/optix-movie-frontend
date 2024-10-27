import { describe, it, expect } from "vitest";
import { toCurrency } from "./toCurrency";

describe("toCurrency", () => {
  it("converts 0 to £0.00", () => {
    expect(toCurrency(0)).toBe("£0.00");
  });

  it("converts 100 to £1.00", () => {
    expect(toCurrency(100)).toBe("£1.00");
  });

  it("converts 12345 to £123.45", () => {
    expect(toCurrency(12345)).toBe("£123.45");
  });

  it("converts 999 to £9.99", () => {
    expect(toCurrency(999)).toBe("£9.99");
  });

  it("converts -100 to £-1.00", () => {
    expect(toCurrency(-100)).toBe("£-1.00");
  });
});
