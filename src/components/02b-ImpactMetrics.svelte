<script lang="ts">
    import { metrics } from "../data/metrics";
    import { reveal } from "../actions/reveal";
</script>

<div class="metrics-strip content-width" data-reveal-section use:reveal>
    {#each metrics as { value, label }, i}
        <div class="metric reveal" style="transition-delay: {50 + i * 60}ms">
            <span class="metric-value">{value}</span>
            <span class="metric-label">{label}</span>
        </div>
    {/each}
</div>

<style lang="scss">
    .metrics-strip {
        display: flex;
        justify-content: center;
        gap: clamp(2rem, 5vw, 4rem);
        padding: clamp(2rem, 4vw, 4rem) 0;
        flex-wrap: wrap;
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
            gap: 1.5rem;
            justify-items: center;
        }
    }
</style>
