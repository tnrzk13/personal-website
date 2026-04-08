<script lang="ts">
  import type { Snippet } from "svelte";
  import { prepareWithSegments, layoutNextLine } from "@chenglou/pretext";
  import type { LayoutLine, LayoutCursor } from "@chenglou/pretext";
  import { availableWidthAtY } from "../utils/circleTextFlow";

  const DEBOUNCE_DELAY_MS = 150;
  const DEFAULT_CIRCLE_GAP_PX = 24;
  const DEFAULT_CIRCLE_RIGHT_MARGIN_PX = 16;

  let {
    paragraphs,
    circleRadiusPx,
    font,
    lineHeightPx,
    paragraphSpacingPx,
    circleGapPx = DEFAULT_CIRCLE_GAP_PX,
    circleTopOffsetPx = 0,
    circleRightMarginPx = DEFAULT_CIRCLE_RIGHT_MARGIN_PX,
    children,
  }: {
    paragraphs: string[];
    circleRadiusPx: number;
    font: string;
    lineHeightPx: number;
    paragraphSpacingPx?: number;
    circleGapPx?: number;
    circleTopOffsetPx?: number;
    circleRightMarginPx?: number;
    children: Snippet;
  } = $props();

  let containerWidthPx = $state(0);
  let fontsReady = $state(false);
  let lines: { text: string; y: number }[] = $state([]);
  let totalHeightPx = $state(0);

  const resolvedParagraphSpacingPx = $derived(paragraphSpacingPx ?? lineHeightPx);
  const circleDiameterPx = $derived(circleRadiusPx * 2);
  const circleCenterX = $derived(containerWidthPx - circleRadiusPx - circleRightMarginPx);
  const circleCenterY = $derived(circleTopOffsetPx + circleRadiusPx);

  // Wait for fonts before measuring text
  $effect(() => {
    document.fonts.ready.then(() => {
      fontsReady = true;
    });
  });

  // Debounced layout recalculation (debounce only on resize, not initial render)
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  let hasInitialLayout = false;

  $effect(() => {
    // Track reactive dependencies
    const _width = containerWidthPx;
    const _ready = fontsReady;
    const _paragraphs = paragraphs;
    const _font = font;

    if (!_ready || _width <= 0) return;

    const runLayout = () => {
      const result = computeLines(_width, _paragraphs, _font);
      lines = result.lines;
      totalHeightPx = result.totalHeightPx;
      hasInitialLayout = true;
    };

    if (!hasInitialLayout) {
      runLayout();
    } else {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(runLayout, DEBOUNCE_DELAY_MS);
    }

    return () => clearTimeout(debounceTimer);
  });

  function computeLines(
    width: number,
    texts: string[],
    fontStr: string
  ): { lines: { text: string; y: number }[]; totalHeightPx: number } {
    const result: { text: string; y: number }[] = [];
    let currentY = 0;

    for (let pIdx = 0; pIdx < texts.length; pIdx++) {
      if (pIdx > 0) currentY += resolvedParagraphSpacingPx;

      const prepared = prepareWithSegments(texts[pIdx], fontStr);
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

      while (true) {
        // Check both edges of the line and use the narrower width
        // so no part of the line extends behind the portrait
        const widthAtTop = availableWidthAtY(
          currentY, width, circleCenterX, circleCenterY, circleRadiusPx, circleGapPx
        );
        const widthAtBottom = availableWidthAtY(
          currentY + lineHeightPx, width, circleCenterX, circleCenterY, circleRadiusPx, circleGapPx
        );
        const lineMaxWidth = Math.min(widthAtTop, widthAtBottom);

        const line: LayoutLine | null = layoutNextLine(
          prepared,
          cursor,
          lineMaxWidth
        );
        if (!line) break;

        result.push({ text: line.text, y: currentY });
        cursor = line.end;
        currentY += lineHeightPx;
      }
    }

    return { lines: result, totalHeightPx: currentY };
  }
</script>

<div
  class="flow-container"
  bind:clientWidth={containerWidthPx}
  style:--circle-diameter="{circleDiameterPx}px"
  style:--circle-gap="{circleGapPx}px"
  style:--line-height="{lineHeightPx}px"
  style:--total-height="{totalHeightPx}px"
>
  {#each lines as line}
    <span
      class="flow-line"
      style="top: {line.y}px"
    >{line.text}</span>
  {/each}

  <div class="flow-portrait" style="top: {circleTopOffsetPx}px; right: {circleRightMarginPx}px">
    {@render children()}
  </div>
</div>

<style lang="scss">
  .flow-container {
    position: relative;
    width: 100%;
    height: var(--total-height);
    min-height: calc(var(--circle-diameter) + var(--circle-gap));
  }

  .flow-line {
    display: block;
    position: absolute;
    left: 0;
    height: var(--line-height);
    white-space: pre;
  }

  .flow-portrait {
    position: absolute;
    width: var(--circle-diameter);
    height: var(--circle-diameter);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
