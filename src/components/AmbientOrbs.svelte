<script lang="ts">
    import { isMobile as isMobileQuery } from '../utils/mediaQuery.svelte';

    interface OrbConfig {
        color: string;
        sizePx: number;
        topPercent: number;
        leftPercent?: number;
        rightPercent?: number;
        blurPx: number;
        driftX: number;
        driftY: number;
        driftDurationSec: number;
    }

    const DESKTOP_ORBS: OrbConfig[] = [
        { color: "rgba(109, 213, 250, 0.35)", sizePx: 600, topPercent: 6, leftPercent: 10, blurPx: 100, driftX: 160, driftY: 120, driftDurationSec: 15 },
        { color: "rgba(252, 165, 241, 0.30)", sizePx: 550, topPercent: 26, rightPercent: 5, blurPx: 100, driftX: -140, driftY: 150, driftDurationSec: 18 },
        { color: "rgba(142, 45, 226, 0.28)", sizePx: 650, topPercent: 50, leftPercent: 2, blurPx: 110, driftX: 180, driftY: -130, driftDurationSec: 20 },
        { color: "rgba(240, 184, 102, 0.20)", sizePx: 450, topPercent: 43, leftPercent: 50, blurPx: 90, driftX: -120, driftY: 100, driftDurationSec: 14 },
        { color: "rgba(5, 117, 230, 0.32)", sizePx: 550, topPercent: 70, rightPercent: 15, blurPx: 100, driftX: 150, driftY: -140, driftDurationSec: 16 },
    ];

    const MOBILE_ORBS: OrbConfig[] = [
        { color: "rgba(109, 213, 250, 0.28)", sizePx: 350, topPercent: 5, leftPercent: 10, blurPx: 70, driftX: 80, driftY: 60, driftDurationSec: 15 },
        { color: "rgba(252, 165, 241, 0.24)", sizePx: 320, topPercent: 26, rightPercent: 0, blurPx: 70, driftX: -70, driftY: 80, driftDurationSec: 18 },
        { color: "rgba(142, 45, 226, 0.22)", sizePx: 400, topPercent: 48, leftPercent: 5, blurPx: 80, driftX: 90, driftY: -70, driftDurationSec: 20 },
        { color: "rgba(5, 117, 230, 0.28)", sizePx: 320, topPercent: 70, rightPercent: 5, blurPx: 70, driftX: 75, driftY: -65, driftDurationSec: 16 },
    ];

    let orbsEl: HTMLDivElement;
    let visible = $state(false);

    $effect(() => {
        if (!orbsEl) return;
        const observer = new IntersectionObserver(
            ([entry]) => { visible = entry.isIntersecting; },
            { rootMargin: '200px' }
        );
        observer.observe(orbsEl);
        return () => observer.disconnect();
    });

    const orbs = $derived(isMobileQuery.value ? MOBILE_ORBS : DESKTOP_ORBS);

    function orbStyle(orb: OrbConfig): string {
        const pos = orb.leftPercent != null
            ? `left: ${orb.leftPercent}%;`
            : `right: ${orb.rightPercent}%;`;
        return [
            `top: ${orb.topPercent}%`,
            pos,
            `width: ${orb.sizePx}px`,
            `height: ${orb.sizePx}px`,
            `background: ${orb.color}`,
            `filter: blur(${orb.blurPx}px)`,
            `--drift-x: ${orb.driftX}px`,
            `--drift-y: ${orb.driftY}px`,
            `--drift-duration: ${orb.driftDurationSec}s`,
        ].join("; ");
    }
</script>

<div class="ambient-orbs" class:paused={!visible} aria-hidden="true" bind:this={orbsEl}>
    {#each orbs as orb, i (i)}
        <div class="orb" style={orbStyle(orb)}></div>
    {/each}
</div>

<style>
    .ambient-orbs {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
    }

    .orb {
        position: absolute;
        border-radius: 50%;
        will-change: transform;
        animation: orb-drift var(--drift-duration) ease-in-out infinite;
    }

    @keyframes orb-drift {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(var(--drift-x), var(--drift-y)); }
        50% { transform: translate(calc(var(--drift-x) * -0.5), calc(var(--drift-y) * 1.2)); }
        75% { transform: translate(calc(var(--drift-x) * 0.8), calc(var(--drift-y) * -0.6)); }
    }

    .ambient-orbs.paused .orb {
        animation-play-state: paused;
    }

    @media (prefers-reduced-motion: reduce) {
        .orb {
            animation: none;
        }
    }
</style>
