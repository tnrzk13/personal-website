<script lang="ts">
  import GlassCard from "./GlassCard.svelte";
  import Techstack from "../Misc/Techstack.svelte";

  import IconGitHub from "../Icons/IconGitHub.svelte";
  import ChevronIcon from "../Icons/ChevronIcon.svelte";
  import { createExpandable } from "../../utils/expandable.svelte";
  import type { ProjectUrls } from "../../types";

  let {
    title,
    imgBase,
    urls,
    text,
    details = [],
    techstack,
    revealDelayMs = 0,
  }: {
    title: string;
    imgBase: string;
    urls: ProjectUrls;
    text: string;
    details?: string[];
    techstack: string[];
    revealDelayMs?: number;
  } = $props();

  const expandable = createExpandable();
</script>

<div class="compact-project reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <button
      class="compact-content"
      onclick={expandable.onclick}
      onmouseenter={expandable.onmouseenter}
      onmouseleave={expandable.onmouseleave}
      aria-expanded={expandable.expanded}
      type="button"
    >
      <div class="compact-row">
        <div class="compact-thumb">
          <picture>
            <source srcset="{imgBase}.avif" type="image/avif">
            <img src="{imgBase}.png" alt={title} loading="lazy" />
          </picture>
        </div>
        <div class="compact-body">
          <div class="compact-title-row">
            {#if urls.projectUrl}
              <a
                href={urls.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit {title} project"
              ><h3 class="compact-title">{title}</h3></a>
            {:else if urls.codeUrl}
              <a
                href={urls.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View {title} source code"
              ><h3 class="compact-title">{title}</h3></a>
            {:else}
              <h3 class="compact-title">{title}</h3>
            {/if}
            {#if urls.codeUrl}
              <a
                href={urls.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View {title} on GitHub"
                class="github-link"
              ><IconGitHub /></a>
            {/if}
          </div>
          <p class="compact-summary">{@html text}</p>
        </div>
        <ChevronIcon open={expandable.expanded} />
      </div>
      <div class="extra-content" class:open={expandable.expanded}>
        <div class="extra-inner">
          {#if details.length > 0}
            <ul class="details-list">
              {#each details as detail}
                <li>{@html detail}</li>
              {/each}
            </ul>
          {/if}
          <Techstack {techstack} />
        </div>
      </div>
    </button>
  </GlassCard>
</div>

<style lang="scss">
  .compact-project {
    color: white;
  }

  .compact-content {
    width: 100%;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: default;
    padding: 0;

    @media (hover: none) {
      cursor: pointer;
    }
  }

  .compact-row {
    display: flex;
    align-items: flex-start;
    gap: 0;
  }

  .compact-thumb {
    width: 35%;
    min-width: 35%;
    overflow: hidden;
    border-radius: 1rem 0 0 0;

    img {
      width: 100%;
      display: block;
    }
  }

  .compact-body {
    flex: 1;
    min-width: 0;
    padding: 0.875rem 1rem;
  }

  .compact-title-row {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;

    a {
      text-decoration: none;
      color: #64acff;

      &:hover {
        filter: brightness(75%);
      }
    }

    :global(svg) {
      width: 0.7em;
      height: 0.7em;
      vertical-align: -0.1em;
    }
  }

  .compact-title {
    font-family: "Montserrat", sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    display: inline;
  }

  .github-link {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;

    &:hover {
      color: white;
    }

    :global(svg) {
      width: 1em;
      height: 1em;
    }
  }

  .compact-summary {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0.35rem 0 0 0;
    line-height: 1.4;

    :global(strong) {
      color: var(--bold-highlight);
      font-weight: 600;
    }
  }

  .compact-row :global(.chevron) {
    color: rgba(255, 255, 255, 0.25);
    flex-shrink: 0;
    align-self: center;
    margin: 0 0.75rem;
  }

  .extra-content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.35s ease;

    &.open {
      grid-template-rows: 1fr;
    }
  }

  .extra-inner {
    overflow: hidden;
    padding: 0 1rem;

    :global(.techstack-container) {
      margin-top: 0.5rem;
      margin-bottom: 0.75rem;
    }
  }

  .details-list {
    margin: 0.75rem 0 0;
    padding: 0.75rem 0 0 1.25em;
    list-style: disc;
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    li {
      margin-bottom: 0.4em;
      font-size: 0.85rem;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.75);

      :global(strong) {
        color: var(--bold-highlight);
        font-weight: 600;
      }
    }
  }
</style>
