<script lang="ts">
  import CardProject from "../Cards/CardProject.svelte";
  import GlassCard from "../Cards/GlassCard.svelte";
  import { lazyPlayback } from "../../actions/lazyPlayback";
  import { createExpandable } from "../../utils/expandable.svelte";
  import type { ProjectData } from "../../types";

  let { projectInfo, revealDelayMs = 0 }: { projectInfo: ProjectData; revealDelayMs?: number } = $props();

  const expandable = createExpandable();
</script>

<div class="compact-project reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <button
      class="expand-trigger"
      onclick={expandable.onclick}
      onmouseenter={expandable.onmouseenter}
      onmouseleave={expandable.onmouseleave}
      aria-expanded={expandable.expanded}
      type="button"
    >
      <div class="compact-img-container">
        {#snippet media()}
          {#if projectInfo.videoUrl}
            <video
              src={projectInfo.videoUrl}
              poster="{projectInfo.imgBase}.avif"
              preload="none"
              muted
              loop
              playsinline
              use:lazyPlayback
            ></video>
          {:else}
            <picture>
              <source srcset="{projectInfo.imgBase}.avif" type="image/avif">
              <img src="{projectInfo.imgBase}.png" alt={projectInfo.title} loading="lazy" />
            </picture>
          {/if}
        {/snippet}

        {#if projectInfo.urls.projectUrl || projectInfo.urls.codeUrl}
          <a href={projectInfo.urls.projectUrl || projectInfo.urls.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="{projectInfo.title}">
            {@render media()}
          </a>
        {:else}
          {@render media()}
        {/if}
      </div>
      <CardProject
        title={projectInfo.title}
        urls={projectInfo.urls}
        text={projectInfo.text}
        details={projectInfo.details}
        techstack={projectInfo.techstack}
        expanded={expandable.expanded}
      />
    </button>
  </GlassCard>
</div>

<style lang="scss">
  .compact-project {
    height: 100%;
  }

  .compact-img-container {
    width: 100%;

    a {
      display: block;
    }

    img, video {
      width: 100%;
      display: block;
      border-radius: 1rem 1rem 0 0;
    }
  }

  .expand-trigger {
    width: 100%;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: default;
    padding: 0;
    @media (hover: none) { cursor: pointer; }
  }
</style>
