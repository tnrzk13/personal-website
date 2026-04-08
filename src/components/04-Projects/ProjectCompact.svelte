<script lang="ts">
  import CardProject from "../Cards/CardProject.svelte";
  import GlassCard from "../Cards/GlassCard.svelte";
  import { lazyPlayback } from "../../actions/lazyPlayback";
  import type { ProjectData } from "../../types";

  let { projectInfo, delayMs = 0 }: { projectInfo: ProjectData; delayMs?: number } = $props();
</script>

<div class="compact-project reveal" style="transition-delay: {delayMs}ms">
  <GlassCard>
    <div class="compact-img-container">
      {#snippet media()}
        {#if projectInfo.videoUrl}
          <video
            src={projectInfo.videoUrl}
            poster={projectInfo.imgurl}
            preload="none"
            muted
            loop
            playsinline
            use:lazyPlayback
          ></video>
        {:else}
          <img src={projectInfo.imgurl} alt={projectInfo.title} loading="lazy" />
        {/if}
      {/snippet}

      {#if projectInfo.urls.projectUrl || projectInfo.urls.codeUrl}
        <a href={projectInfo.urls.projectUrl || projectInfo.urls.codeUrl} target="_blank" rel="noopener noreferrer">
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
      techstack={projectInfo.techstack}
    />
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
</style>
