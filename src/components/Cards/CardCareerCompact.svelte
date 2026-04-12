<script>
  import GlassCard from "./GlassCard.svelte";
  import BulletList from "../Misc/BulletList.svelte";
  import Techstack from "../Misc/Techstack.svelte";
  import ChevronIcon from "../Icons/ChevronIcon.svelte";
  import { createExpandable } from "../../utils/expandable.svelte";

  let { imgBase, title, subtitle, datePeriod, points, techstack, revealDelayMs = 0 } = $props();

  const hasExtra = points.length > 1;
  const expandable = createExpandable(hasExtra);
</script>

<div class="compact-card reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <button
      class="compact-content"
      class:expandable={hasExtra}
      onpointerdown={expandable.onpointerdown}
      onclick={expandable.onclick}
      onpointerenter={expandable.onpointerenter}
      onpointerleave={expandable.onpointerleave}
      aria-expanded={hasExtra ? expandable.expanded : undefined}
      type="button"
    >
      <div class="compact-header">
        <div class="compact-logo">
          <img src="{imgBase}.png" alt="company logo" loading="lazy" />
        </div>
        <div class="compact-info">
          <div class="compact-titles">
            <h3 class="compact-title">{title}</h3>
            <p class="compact-subtitle">{subtitle}</p>
          </div>
          <span class="compact-date">{datePeriod}</span>
        </div>
        {#if hasExtra}
          <ChevronIcon open={expandable.expanded} />
        {/if}
      </div>
      {#if points.length > 0}
        <div class="visible-bullet">
          <BulletList points={points.slice(0, 1)} />
        </div>
      {/if}
      {#if hasExtra}
        <div class="extra-bullets" class:open={expandable.expanded}>
          <div class="extra-list">
            <BulletList points={points.slice(1)} />
          </div>
        </div>
      {/if}
      <Techstack {techstack} />
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

    :global(.techstack-container) {
      margin-top: 0.5rem;
      font-size: 0.8rem;
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
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
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

  .compact-header :global(.chevron) {
    color: rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
    align-self: flex-start;
    margin-top: 0.25rem;
  }

  .visible-bullet {
    margin-top: 0.75rem;

    :global(.bullet-list li) {
      font-size: 0.9rem;
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

    :global(.bullet-list) {
      margin: 0;
    }

    :global(.bullet-list li) {
      font-size: 0.9rem;
      padding-top: 0.5rem;
    }
  }
</style>
