import type { Action } from "svelte/action";

const MAX_OFFSET_PX = 6;

/**
 * Svelte action that creates a magnetic hover effect - the element subtly
 * shifts toward the cursor when it's nearby, then springs back on leave.
 *
 * Only activates on devices with fine pointers (no touch) and when the
 * user has not requested reduced motion.
 */
export const magneticHover: Action<HTMLElement, void> = (node) => {
  if (!canActivate()) return;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const offsetX = clampOffset(distanceX, rect.width);
    const offsetY = clampOffset(distanceY, rect.height);

    node.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  const handleMouseLeave = () => {
    node.style.transform = "translate(0, 0)";
  };

  node.style.transition = "transform 0.3s ease-out";
  node.addEventListener("mousemove", handleMouseMove);
  node.addEventListener("mouseleave", handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
      node.style.transform = "";
      node.style.transition = "";
    },
  };
};

function canActivate(): boolean {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  return hasFinePointer && !prefersReducedMotion;
}

/** Map cursor distance from center to a clamped offset (max MAX_OFFSET_PX). */
function clampOffset(distance: number, dimension: number): number {
  const halfDimension = dimension / 2;
  if (halfDimension === 0) return 0;
  const ratio = distance / halfDimension;
  return Math.max(-MAX_OFFSET_PX, Math.min(MAX_OFFSET_PX, ratio * MAX_OFFSET_PX));
}
