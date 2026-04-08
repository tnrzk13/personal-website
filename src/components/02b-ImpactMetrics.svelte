<script lang="ts">
    import { metrics } from "../data/metrics";

    const DURATION_MS = 2000;
    const STAGGER_MS = 150;

    let currentValues: number[] = $state(metrics.map(() => 0));

    function easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
    }

    function countUpOnReveal(node: HTMLElement) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();

                if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                    currentValues = metrics.map((m) => m.target);
                    return;
                }

                metrics.forEach((metric, i) => {
                    setTimeout(() => {
                        const start = performance.now();

                        function tick(now: number) {
                            const elapsed = now - start;
                            const progress = Math.min(elapsed / DURATION_MS, 1);
                            currentValues[i] = Math.round(easeOutCubic(progress) * metric.target);
                            if (progress < 1) requestAnimationFrame(tick);
                        }

                        requestAnimationFrame(tick);
                    }, i * STAGGER_MS);
                });
            },
            { rootMargin: "0px 0px -40% 0px", threshold: 0 }
        );

        observer.observe(node);
        return { destroy: () => observer.disconnect() };
    }
</script>

<div class="metrics-strip" use:countUpOnReveal>
    {#each metrics as { prefix, suffix, label }, i}
        <div class="metric">
            <span class="metric-value">
                {prefix ?? ""}{currentValues[i]}{suffix}
            </span>
            <span class="metric-label">{label}</span>
        </div>
    {/each}
</div>

<style lang="scss">
    .metrics-strip {
        display: flex;
        justify-content: center;
        gap: clamp(2rem, 5vw, 4rem);
        padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 3rem);
        flex-wrap: wrap;
        margin-top: -3.5rem;
        background: rgba(4, 13, 33, 0.55);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        max-width: fit-content;
    }

    .metric {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .metric-value {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
        font-size: clamp(1.75rem, 3.5vw, 2.5rem);
        background-image: var(--gradient-cool-sky);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.2;
    }

    .metric-label {
        font-family: "Inter", system-ui, sans-serif;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    @media (max-width: 767px) {
        .metrics-strip {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem 2rem;
            justify-items: center;
            margin-top: -2rem;
        }
    }
</style>
