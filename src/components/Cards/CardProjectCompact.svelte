<script>
  import GlassCard from "./GlassCard.svelte";
  import Techstack from "../Misc/Techstack.svelte";
  import IconLink from "../Icons/IconLink.svelte";
  import IconGitHub from "../Icons/IconGitHub.svelte";
  import type { ProjectUrls } from "../../types";

  let {
    title,
    imgBase,
    oneliner,
    urls,
    text,
    techstack,
    revealDelayMs = 0,
  }: {
    title: string;
    imgBase: string;
    oneliner: string;
    urls: ProjectUrls;
    text: string;
    techstack: string[];
    revealDelayMs?: number;
  } = $props();

  let expanded = $state(false);
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
</script>

<div class="compact-project reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <button
      class="compact-content"
      onclick={() => { if (!canHover) expanded = !expanded; }}
      onmouseenter={() => { if (canHover) expanded = true; }}
      onmouseleave={() => { if (canHover) expanded = false; }}
      aria-expanded={expanded}
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
              ><h3 class="compact-title">{title} <IconLink /></h3></a>
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
          <p class="compact-oneliner">{oneliner}</p>
          <Techstack {techstack} />
        </div>
        <svg
          class="chevron"
          class:open={expanded}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="extra-content" class:open={expanded}>
        <div class="extra-inner">
          <p class="expanded-text">{@html text}</p>
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
    width: 140px;
    min-width: 140px;
    overflow: hidden;
    border-radius: 1rem 0 0 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .compact-body {
    flex: 1;
    min-width: 0;
    padding: 0.875rem 1rem;

    :global(.techstack-container) {
      margin-top: 0.75rem;
    }
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

  .compact-oneliner {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0.35rem 0 0 0;
    line-height: 1.3;
  }

  .chevron {
    color: rgba(255, 255, 255, 0.25);
    transition: transform 0.3s ease;
    flex-shrink: 0;
    align-self: center;
    margin: 0 0.75rem;

    &.open {
      transform: rotate(180deg);
    }
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
  }

  .expanded-text {
    padding: 0.75rem 1rem 1rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.5;
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    :global(strong) {
      color: var(--bold-highlight);
      font-weight: 600;
    }
  }
</style>
