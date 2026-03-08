import { describe, expect, it, vi } from "vitest";

vi.mock("../utils/browser", () => ({
  isBrowserSafari: vi.fn(() => false),
}));

import { cardList } from "./career";
import { projList } from "./projects";

describe("cardList (career data)", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(cardList)).toBe(true);
    expect(cardList.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    for (const card of cardList) {
      expect(card.title).toBeTruthy();
      expect(card.subtitle).toBeTruthy();
      expect(card.techstack.length).toBeGreaterThan(0);
      expect(card.points.length).toBeGreaterThan(0);
      expect(card.imgurl).toBeTruthy();
      expect(card.logoColor).toBeTruthy();
    }
  });

  it("each point has valid text parts", () => {
    for (const card of cardList) {
      for (const point of card.points) {
        expect(point.length).toBeGreaterThan(0);
        for (const part of point) {
          expect(["bold", "none"]).toContain(part.style);
          expect(part.text).toBeDefined();
        }
      }
    }
  });
});

describe("projList (project data)", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(projList)).toBe(true);
    expect(projList.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    for (const proj of projList) {
      expect(proj.title).toBeTruthy();
      expect(proj.imgurl).toBeTruthy();
      expect(proj.text).toBeTruthy();
      expect(proj.techstack.length).toBeGreaterThan(0);
      expect(proj.urls).toBeDefined();
      expect(proj.urls.codeUrl).toBeTruthy();
    }
  });
});
