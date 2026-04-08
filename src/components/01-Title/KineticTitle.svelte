<script lang="ts">
  import { onMount } from "svelte";
  import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";
  import {
    createCharLayouts,
    updateEntrance,
    updateHoverGlitch,
    startIdleGlitch,
    updateIdleGlitch,
    nextIdleGlitchDelayMs,
    skipToDecoded,
    type CharLayout,
    type IdleGlitchState,
  } from "../../utils/scrambleText";

  let {
    text,
    fontFamily,
    fontWeight,
    color,
    visible,
  }: {
    text: string;
    fontFamily: string;
    fontWeight: number;
    color: string;
    visible: boolean;
  } = $props();

  let canvasEl: HTMLCanvasElement | undefined = $state();
  let wrapperEl: HTMLDivElement | undefined = $state();
  let prefersReducedMotion = $state(false);

  let chars: CharLayout[] = [];
  let rafId = 0;
  let cursorX: number | null = null;
  let cursorY: number | null = null;
  let layoutReady = false;
  let canvasLogicalWidth = 0;
  let canvasLogicalHeight = 0;
  let fontSizePx = 0;
  let fontString = "";
  let startTimeMs = 0;
  let entranceComplete = false;
  let frameCount = 0;
  let idleGlitchState: IdleGlitchState | null = null;
  let nextIdleGlitchAtMs = Infinity;

  // --- Canvas setup ---

  function computeFontSizePx(): number {
    return Math.min(window.innerWidth * 0.07, window.innerHeight * 0.12);
  }

  function layoutText(): void {
    if (!canvasEl || !wrapperEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    fontSizePx = computeFontSizePx();
    fontString = `${fontWeight} ${fontSizePx}px ${fontFamily}`;

    const containerWidth = wrapperEl.clientWidth;
    if (containerWidth <= 0) return;

    const lineHeight = fontSizePx * 1.2;
    const prepared = prepareWithSegments(text, fontString);
    const layoutResult = layoutWithLines(prepared, containerWidth, lineHeight);

    const dpr = window.devicePixelRatio || 1;
    canvasLogicalWidth = containerWidth;
    canvasLogicalHeight = layoutResult.height + fontSizePx * 0.3;

    canvasEl.width = canvasLogicalWidth * dpr;
    canvasEl.height = canvasLogicalHeight * dpr;
    canvasEl.style.width = `${canvasLogicalWidth}px`;
    canvasEl.style.height = `${canvasLogicalHeight}px`;

    ctx.scale(dpr, dpr);
    ctx.font = fontString;
    ctx.fillStyle = color;
    ctx.textBaseline = "alphabetic";

    chars = createCharLayouts(ctx, layoutResult.lines, lineHeight);
    startTimeMs = 0;
    entranceComplete = false;
    frameCount = 0;
    idleGlitchState = null;
    nextIdleGlitchAtMs = Infinity;
    layoutReady = true;
  }

  // --- Rendering ---

  function renderFrame(): void {
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvasLogicalWidth, canvasLogicalHeight);
    ctx.font = fontString;
    ctx.fillStyle = color;
    ctx.textBaseline = "alphabetic";

    for (const ch of chars) {
      ctx.fillText(ch.displayChar, ch.restX, ch.restY);
    }
    ctx.restore();
  }

  // --- Animation loop ---

  function animationLoop(timestamp: number): void {
    if (!layoutReady) {
      rafId = requestAnimationFrame(animationLoop);
      return;
    }
    if (!startTimeMs) startTimeMs = timestamp;
    frameCount++;

    const wasEntranceComplete = entranceComplete;
    entranceComplete = updateEntrance(chars, timestamp - startTimeMs) || entranceComplete;
    if (entranceComplete) {
      if (!wasEntranceComplete) {
        nextIdleGlitchAtMs = timestamp + nextIdleGlitchDelayMs();
      }
      updateHoverGlitch(chars, cursorX, cursorY, frameCount, fontSizePx);

      if (idleGlitchState) {
        idleGlitchState = updateIdleGlitch(chars, frameCount, idleGlitchState);
        if (!idleGlitchState) {
          nextIdleGlitchAtMs = timestamp + nextIdleGlitchDelayMs();
        }
      } else if (cursorX === null && cursorY === null && timestamp >= nextIdleGlitchAtMs) {
        idleGlitchState = startIdleGlitch(chars, frameCount);
        if (!idleGlitchState) {
          nextIdleGlitchAtMs = timestamp + nextIdleGlitchDelayMs();
        }
      }
    }
    renderFrame();
    rafId = requestAnimationFrame(animationLoop);
  }

  function startLoop(): void {
    if (rafId) return;
    rafId = requestAnimationFrame(animationLoop);
  }

  function stopLoop(): void {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  // --- Event handlers ---

  function handleMouseMove(e: MouseEvent): void {
    if (!canvasEl || !entranceComplete) return;
    const rect = canvasEl.getBoundingClientRect();
    cursorX = e.clientX - rect.left;
    cursorY = e.clientY - rect.top;
  }

  function handleMouseLeave(): void {
    cursorX = null;
    cursorY = null;
  }

  function handleResize(): void {
    layoutText();
    if (prefersReducedMotion) {
      skipToDecoded(chars);
      entranceComplete = true;
      renderFrame();
    }
  }

  // --- Lifecycle ---

  onMount(() => {
    prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.fonts.ready.then(() => {
      layoutText();
      if (prefersReducedMotion) {
        skipToDecoded(chars);
        entranceComplete = true;
        renderFrame();
      } else if (visible) {
        startLoop();
      }
    });

    window.addEventListener("resize", handleResize);
    return () => {
      stopLoop();
      window.removeEventListener("resize", handleResize);
    };
  });

  $effect(() => {
    if (prefersReducedMotion) return;
    if (visible) {
      startLoop();
    } else {
      stopLoop();
    }
  });
</script>

<div class="kinetic-title-wrapper" bind:this={wrapperEl}>
  <canvas
    bind:this={canvasEl}
    aria-hidden="true"
    onmousemove={prefersReducedMotion ? undefined : handleMouseMove}
    onmouseleave={prefersReducedMotion ? undefined : handleMouseLeave}
  ></canvas>
</div>

<style>
  .kinetic-title-wrapper {
    width: 100%;
  }

  canvas {
    display: block;
    cursor: pointer;
  }
</style>
