import { describe, expect, it } from "vitest";
import { availableWidthAtY } from "./circleTextFlow";

const CONTAINER_WIDTH = 800;
const CIRCLE_RADIUS = 120;
const GAP = 16;
// Circle positioned on the right side of the container
const CIRCLE_CENTER_X = CONTAINER_WIDTH - CIRCLE_RADIUS;
const CIRCLE_CENTER_Y = 150;

describe("availableWidthAtY", () => {
  it("returns full container width for a line above the circle", () => {
    const lineY = CIRCLE_CENTER_Y - CIRCLE_RADIUS - 10;
    expect(
      availableWidthAtY(
        lineY, CONTAINER_WIDTH, CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, GAP
      )
    ).toBe(CONTAINER_WIDTH);
  });

  it("returns full container width for a line below the circle", () => {
    const lineY = CIRCLE_CENTER_Y + CIRCLE_RADIUS + 10;
    expect(
      availableWidthAtY(
        lineY, CONTAINER_WIDTH, CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, GAP
      )
    ).toBe(CONTAINER_WIDTH);
  });

  it("returns container width minus full diameter minus gap at circle center", () => {
    const result = availableWidthAtY(
      CIRCLE_CENTER_Y, CONTAINER_WIDTH, CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, GAP
    );
    // At center, chord half-width = full radius, so left edge = centerX - radius
    const expectedLeftEdge = CIRCLE_CENTER_X - CIRCLE_RADIUS;
    expect(result).toBe(expectedLeftEdge - GAP);
  });

  it("returns wider width near the circle edge than at center", () => {
    const nearEdgeY = CIRCLE_CENTER_Y + CIRCLE_RADIUS - 10;
    const atCenterResult = availableWidthAtY(
      CIRCLE_CENTER_Y, CONTAINER_WIDTH, CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, GAP
    );
    const nearEdgeResult = availableWidthAtY(
      nearEdgeY, CONTAINER_WIDTH, CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, GAP
    );
    expect(nearEdgeResult).toBeGreaterThan(atCenterResult);
  });

  it("returns approximately full width at the exact circle top", () => {
    const topY = CIRCLE_CENTER_Y - CIRCLE_RADIUS;
    const result = availableWidthAtY(
      topY, CONTAINER_WIDTH, CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, GAP
    );
    // Exactly at the boundary, abs(dy) === circleRadius, so it returns full width
    expect(result).toBe(CONTAINER_WIDTH);
  });

  it("returns approximately full width at the exact circle bottom", () => {
    const bottomY = CIRCLE_CENTER_Y + CIRCLE_RADIUS;
    const result = availableWidthAtY(
      bottomY, CONTAINER_WIDTH, CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, GAP
    );
    expect(result).toBe(CONTAINER_WIDTH);
  });

  it("returns 0 when available width would be negative", () => {
    // Circle so large and gap so big that there's no room for text
    const hugeRadius = CONTAINER_WIDTH;
    const hugeCenterX = CONTAINER_WIDTH / 2;
    const result = availableWidthAtY(
      CIRCLE_CENTER_Y, CONTAINER_WIDTH, hugeCenterX, CIRCLE_CENTER_Y, hugeRadius, GAP
    );
    expect(result).toBe(0);
  });
});
