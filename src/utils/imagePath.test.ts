import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("./browser", () => ({
  isBrowserSafari: vi.fn(),
}));

import { getImagePath } from "./imagePath";
import { isBrowserSafari } from "./browser";

const mockedIsBrowserSafari = vi.mocked(isBrowserSafari);

describe("getImagePath", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns .avif path for non-Safari browsers", () => {
    mockedIsBrowserSafari.mockReturnValue(false);
    expect(getImagePath("images/intro/001")).toBe("images/intro/001.avif");
  });

  it("returns .png path for Safari", () => {
    mockedIsBrowserSafari.mockReturnValue(true);
    expect(getImagePath("images/intro/001")).toBe("images/intro/001.png");
  });

  it("constructs correct path with subdirectories", () => {
    mockedIsBrowserSafari.mockReturnValue(false);
    expect(getImagePath("images/03-career/alethea")).toBe(
      "images/03-career/alethea.avif"
    );
  });
});
