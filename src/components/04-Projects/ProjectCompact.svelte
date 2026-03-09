<script lang="ts">
  import CardProject from "../Cards/CardProject.svelte";
  import type { ProjectData } from "../../types";

  let { projectInfo, delayMs = 0 }: { projectInfo: ProjectData; delayMs?: number } = $props();
</script>

<div class="compact-project reveal" style="transition-delay: {delayMs}ms">
  <div class="compact-img-container">
    {#if projectInfo.urls.projectUrl || projectInfo.urls.codeUrl}
      <a href={projectInfo.urls.projectUrl || projectInfo.urls.codeUrl} target="_blank" rel="noopener noreferrer">
        <img src={projectInfo.imgurl} alt={projectInfo.title} loading="lazy" />
      </a>
    {:else}
      <img src={projectInfo.imgurl} alt={projectInfo.title} loading="lazy" />
    {/if}
  </div>
  <CardProject
    title={projectInfo.title}
    urls={projectInfo.urls}
    text={projectInfo.text}
    techstack={projectInfo.techstack}
  />
</div>

<style lang="scss">
  .compact-project {
    background-color: #1a1d2e;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;

    .compact-img-container {
      width: 100%;

      a {
        display: block;
      }

      img {
        width: 100%;
        display: block;
        border-radius: 1rem;
        transition: scale 0.4s ease;
      }

      @media (hover: hover) {
        img:hover {
          scale: 1.05;
        }
      }
    }
  }
</style>
