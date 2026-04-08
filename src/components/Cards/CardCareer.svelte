<script>
  import Techstack from "../Misc/Techstack.svelte";
  import BulletList from "../Misc/BulletList.svelte";
  import GlassCard from "./GlassCard.svelte";
  import ChevronIcon from "../Icons/ChevronIcon.svelte";
  import { createExpandable } from "../../utils/expandable.svelte";

  let { imgBase, title, subtitle, datePeriod, points, logoColor, techstack, revealDelayMs = 0 } = $props();

  const VISIBLE_BULLET_COUNT = 2;
  const hasExtra = points.length > VISIBLE_BULLET_COUNT;
  const expandable = createExpandable(hasExtra);
  const visiblePoints = points.slice(0, VISIBLE_BULLET_COUNT);
  const extraPoints = points.slice(VISIBLE_BULLET_COUNT);
</script>

<div class="card-container reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <button
      class="career-content"
      class:expandable={hasExtra}
      onclick={expandable.onclick}
      onmouseenter={expandable.onmouseenter}
      onmouseleave={expandable.onmouseleave}
      aria-expanded={hasExtra ? expandable.expanded : undefined}
      type="button"
    >
    <div class="card-header">
      <div class="circle-logo" style="background-image: {logoColor}">
        <picture>
          <source srcset="{imgBase}.avif" type="image/avif">
          <img class="logo" src="{imgBase}.png" alt="company logo" loading="lazy" />
        </picture>
      </div>
      <div class="header-text">
        <div class="header-titles">
          <h3 class="card-title">{title}</h3>
          <p class="card-subtitle">{subtitle}</p>
        </div>
        <span class="date-period">{datePeriod}</span>
      </div>
      {#if hasExtra}
        <ChevronIcon open={expandable.expanded} />
      {/if}
    </div>
    <div class="card-body">
      <div class="techstack-wrapper">
        <Techstack {techstack} />
      </div>
      <BulletList points={visiblePoints} />
      {#if hasExtra}
        <div class="extra-bullets" class:open={expandable.expanded}>
          <div class="extra-list">
            <BulletList points={extraPoints} />
          </div>
        </div>
      {/if}
    </div>
    </button>
  </GlassCard>
</div>

<style lang="scss">
  .card-container {
    padding: 0;
    margin-bottom: 2.5rem;
    color: white;
    text-align: center;
    min-width: 0;

    .career-content {
      padding: 1.75rem;
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

    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .header-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      column-gap: 1rem;
      row-gap: 0.25rem;

      .header-titles {
        flex: 1 1 auto;
        min-width: 0;
        text-align: left;

        h3 {
          font-family: "Montserrat", sans-serif;
          font-size: 1.25rem;
          line-height: 1.3;
        }
        p.card-subtitle {
          font-size: 1.05rem;
          color: rgb(200, 200, 200);
          margin-top: 0.15rem;
        }
      }

      .date-period {
        font-family: "Montserrat", sans-serif;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.5);
        white-space: nowrap;
      }
    }

    :global(.chevron) {
      color: rgba(255, 255, 255, 0.4);
      flex-shrink: 0;
      align-self: flex-start;
      margin-top: 0.25rem;
    }

    .card-body {
      text-align: left;
      padding: 0;
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
        padding-top: 0.5rem;
      }
    }

    .circle-logo {
      width: 4em;
      height: 4em;
      min-width: 4em;
      border-radius: 50%;
      display: grid;
      place-items: center;

      img.logo {
        display: block;
        width: 3.2em;
        height: auto;
      }
    }

    .techstack-wrapper {
      margin-bottom: 1.25rem;
    }
  }
</style>
