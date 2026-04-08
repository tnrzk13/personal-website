<script>
  import CardProject from "../Cards/CardProject.svelte";
  import { lazyPlayback } from "../../actions/lazyPlayback";
  import { SM_SCREEN_PX } from "../../utils/breakpoints";
  let { projectIndex, projectInfo } = $props();

  let innerWidth = $state(window.innerWidth);
  const isReversed = $derived(innerWidth >= SM_SCREEN_PX && projectIndex % 2 !== 0);

  $effect(() => {
    const onResize = () => (innerWidth = window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });
</script>

<div class="project-container reveal" class:reversed={isReversed} style="transition-delay: {projectIndex * 60 + 250}ms">
  <div class="img-container">
    <div class="main-img-container" class:reversed-offset={isReversed}>
      {#snippet media(glowing)}
        {#if projectInfo.videoUrl}
          <video
            class="main"
            class:glowing
            src={projectInfo.videoUrl}
            poster={projectInfo.imgurl}
            preload="none"
            muted
            loop
            playsinline
            use:lazyPlayback
          ></video>
        {:else}
          <img class="main" class:glowing src={projectInfo.imgurl} alt="project" loading="lazy" />
        {/if}
      {/snippet}

      {#if projectInfo.urls.projectUrl || projectInfo.urls.codeUrl}
        <a href={projectInfo.urls.projectUrl || projectInfo.urls.codeUrl} target="_blank" rel="noopener noreferrer">
          {@render media(true)}
        </a>
      {:else}
        {@render media(false)}
      {/if}
    </div>
  </div>
  <div class="proj-description">
    <CardProject
      title={projectInfo.title}
      urls={projectInfo.urls}
      text={projectInfo.text}
      techstack={projectInfo.techstack}
    />
  </div>
</div>

<style lang="scss">
  @media (max-width: 767px) {
    .main-img-container {
      padding: 0 1em;
    }
  }

  .project-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2.5em;

    &.reversed {
      .img-container {
        order: 2;
      }
      .proj-description {
        order: 1;
      }
    }

    .proj-description {
      padding: 0;
      flex: 0 0 41.67%;
    }
    .img-container {
      align-self: center;
      position: relative;
      flex: 0 0 58.33%;

      img.main, video.main {
        padding: 0;
        margin: 0;
        width: 100%;
        border-radius: 1rem;
        transition: 0.5s;
      }

      img.glowing, video.glowing {
        box-shadow: 0 0 65px rgb(237 78 80), 0 0 0 1px rgb(255 255 255 / 10%),
          0 2px 2px rgb(0 0 0 / 3%), 0 4px 4px rgb(0 0 0 / 4%),
          0 10px 8px rgb(0 0 0 / 5%), 0 15px 15px rgb(0 0 0 / 6%),
          0 30px 30px rgb(0 0 0 / 7%), 0 70px 65px rgb(0 0 0 / 9%);
      }
    }

    .main-img-container {
      width: 83.33%;
    }
    .reversed-offset {
      margin-left: 16.67%;
    }

    img:hover, video:hover {
      scale: 105%;
    }
  }

  @media (max-width: 767px) {
    .project-container {
      .img-container { flex: 0 0 100%; }
      .proj-description { flex: 0 0 100%; }
      .main-img-container { width: 100%; }
      .reversed-offset { margin-left: 0; }
    }
  }
</style>
