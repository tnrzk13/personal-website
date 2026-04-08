<script>
  import GlassCard from "./GlassCard.svelte";

  let { imgBase, title, subtitle, datePeriod, points, logoColor, revealDelayMs = 0 } = $props();

  let expanded = $state(false);
  const hasExtra = points.length > 1;
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
</script>

<div class="compact-card reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <button
      class="compact-content"
      class:expandable={hasExtra}
      onclick={() => { if (hasExtra && !canHover) expanded = !expanded; }}
      onmouseenter={() => { if (hasExtra && canHover) expanded = true; }}
      onmouseleave={() => { if (hasExtra && canHover) expanded = false; }}
      aria-expanded={hasExtra ? expanded : undefined}
      type="button"
    >
      <div class="compact-header">
        <div class="compact-logo" style="background-image: {logoColor}">
          <picture>
            <source srcset="{imgBase}.avif" type="image/avif">
            <img src="{imgBase}.png" alt="company logo" loading="lazy" />
          </picture>
        </div>
        <div class="compact-info">
          <div class="compact-titles">
            <h3 class="compact-title">{title}</h3>
            <p class="compact-subtitle">{subtitle}</p>
          </div>
          <span class="compact-date">{datePeriod}</span>
        </div>
        {#if hasExtra}
          <svg class="chevron" class:open={expanded} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        {/if}
      </div>
      {#if points.length > 0}
        <ul class="bullet-list">
          <li>
            {#each points[0] as part}
              {#if part.style === "bold"}
                <b>{part.text}</b>
              {:else}
                <span class="point-part">{part.text}</span>
              {/if}
            {/each}
          </li>
        </ul>
      {/if}
      {#if hasExtra}
        <div class="extra-bullets" class:open={expanded}>
          <ul class="bullet-list extra-list">
            {#each points.slice(1) as point}
              <li>
                {#each point as part}
                  {#if part.style === "bold"}
                    <b>{part.text}</b>
                  {:else}
                    <span class="point-part">{part.text}</span>
                  {/if}
                {/each}
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </button>
  </GlassCard>
</div>

<style lang="scss">
  .compact-card {
    color: white;
  }

  .compact-content {
    padding: 1rem;
    width: 100%;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: default;

    @media (hover: none) {
      &.expandable {
        cursor: pointer;
      }
    }
  }

  .compact-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .compact-logo {
    width: 2.5em;
    height: 2.5em;
    min-width: 2.5em;
    border-radius: 50%;
    display: grid;
    place-items: center;

    img {
      display: block;
      width: 2em;
      height: auto;
    }
  }

  .compact-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    column-gap: 1rem;
    row-gap: 0.15rem;

    .compact-titles {
      flex: 1 1 auto;
      min-width: 0;

      h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 1rem;
      }

      p {
        font-size: 0.9rem;
        color: rgb(200, 200, 200);
        margin-top: 0.1rem;
      }
    }

    .compact-date {
      font-family: "Montserrat", sans-serif;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
      white-space: nowrap;
    }
  }

  .chevron {
    color: rgba(255, 255, 255, 0.4);
    transition: transform 0.3s ease;
    flex-shrink: 0;
    align-self: flex-start;
    margin-top: 0.25rem;

    &.open {
      transform: rotate(180deg);
    }
  }

  .bullet-list {
    list-style: none;
    padding: 0;
    margin: 0.75rem 0 0 0;

    li {
      font-size: 0.9rem;
      color: white;

      &::before {
        content: "\2022";
        margin-right: 0.5em;
        color: rgba(255, 255, 255, 0.4);
      }

      b {
        color: var(--bold-highlight);
      }
    }
  }

  .extra-bullets {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.35s ease;

    &.open {
      grid-template-rows: 1fr;
    }
  }

  .extra-list {
    overflow: hidden;
    margin: 0;

    li {
      padding-top: 0.5rem;
    }
  }
</style>
