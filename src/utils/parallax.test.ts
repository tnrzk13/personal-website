import { describe, expect, it } from "vitest";
import {
  getContactParallax,
  getLayerScale,
  getLayerOpacity,
  getLayerOffsetPx,
} from "./parallax";

describe("getLayerScale", () => {
  it("returns empty string for layers 0-4", () => {
    for (let i = 0; i <= 4; i++) {
      expect(getLayerScale(i)).toBe("");
    }
  });

  it('returns scale(1.02) for layers 5-6', () => {
    expect(getLayerScale(5)).toBe(" scale(1.02)");
    expect(getLayerScale(6)).toBe(" scale(1.02)");
  });

  it('returns scale(1.04) for layers 7+', () => {
    expect(getLayerScale(7)).toBe(" scale(1.04)");
    expect(getLayerScale(10)).toBe(" scale(1.04)");
  });
});

describe("getLayerOpacity", () => {
  it("returns 0.85 for layer 0", () => {
    expect(getLayerOpacity(0)).toBe(0.85);
  });

  it("returns 0.92 for layer 1", () => {
    expect(getLayerOpacity(1)).toBe(0.92);
  });

  it("returns 1 for layers 2+", () => {
    expect(getLayerOpacity(2)).toBe(1);
    expect(getLayerOpacity(5)).toBe(1);
    expect(getLayerOpacity(10)).toBe(1);
  });
});

describe("getLayerOffsetPx", () => {
  it("returns 0 for layer 0", () => {
    expect(getLayerOffsetPx(0)).toBe(0);
  });

  it("returns 50 for layers 1-3", () => {
    expect(getLayerOffsetPx(1)).toBe(50);
    expect(getLayerOffsetPx(2)).toBe(50);
    expect(getLayerOffsetPx(3)).toBe(50);
  });

  it("returns 50 for layer 4", () => {
    expect(getLayerOffsetPx(4)).toBe(50);
  });

  it("returns 40 for layers 5-6", () => {
    expect(getLayerOffsetPx(5)).toBe(40);
    expect(getLayerOffsetPx(6)).toBe(40);
  });

  it("returns 25 for layers 7-8", () => {
    expect(getLayerOffsetPx(7)).toBe(25);
    expect(getLayerOffsetPx(8)).toBe(25);
  });

  it("returns 10 for layers 9+", () => {
    expect(getLayerOffsetPx(9)).toBe(10);
    expect(getLayerOffsetPx(10)).toBe(10);
  });
});

describe("getContactParallax", () => {
  const numImgLayers = 10;
  const imgHeight = 800;
  const contactYOffset = 200;

  it("returns positive value when scroll is within image height", () => {
    const result = getContactParallax(5, numImgLayers, imgHeight, 0, contactYOffset);
    expect(result).toBeGreaterThan(0);
  });

  it("returns 0 when scroll far exceeds image height", () => {
    const result = getContactParallax(5, numImgLayers, imgHeight, 2000, contactYOffset);
    expect(result).toBe(0);
  });

  it("returns contactYOffset for layer 0 (no parallax)", () => {
    const result = getContactParallax(0, numImgLayers, imgHeight, 100, contactYOffset);
    expect(result).toBe(contactYOffset);
  });

  it("returns imgHeight - yScroll for max layer (full parallax)", () => {
    const yScroll = 100;
    const result = getContactParallax(numImgLayers, numImgLayers, imgHeight, yScroll, contactYOffset);
    expect(result).toBe(imgHeight - yScroll);
  });

  it("clamps to 0 (never returns negative)", () => {
    const result = getContactParallax(8, numImgLayers, imgHeight, 900, contactYOffset);
    expect(result).toBeGreaterThanOrEqual(0);
  });
});
