/**
 * Calculate available horizontal text width at a given Y position,
 * accounting for a circle positioned on the right side of the container.
 *
 * When the line doesn't intersect the circle, full container width is returned.
 * When it does, we find the circle's left edge at that Y via chord geometry
 * and subtract a gap so text doesn't touch the circle.
 */
export function availableWidthAtY(
  y: number,
  containerWidth: number,
  circleCenterX: number,
  circleCenterY: number,
  circleRadius: number,
  gapPx: number
): number {
  const dy = y - circleCenterY;
  if (Math.abs(dy) >= circleRadius) return containerWidth;

  const chordHalfWidth = Math.sqrt(
    circleRadius * circleRadius - dy * dy
  );
  const circleLeftEdge = circleCenterX - chordHalfWidth;
  return Math.max(0, circleLeftEdge - gapPx);
}
