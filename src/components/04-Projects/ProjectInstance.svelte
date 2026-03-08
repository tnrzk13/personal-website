<script>
  import CardProject from "../Cards/CardProject.svelte";
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

<div class="row project-container" class:reversed={isReversed}>
  <div class="img-container col-sm-7">
    <div class="main-img-container col-sm-10" class:offset-sm-2={isReversed}>
      {#if projectInfo.urls.projectUrl || projectInfo.urls.codeUrl}
        <a href={projectInfo.urls.projectUrl || projectInfo.urls.codeUrl}>
          <img class="main glowing" src={projectInfo.imgurl} alt="project" />
        </a>
      {:else}
        <img class="main" src={projectInfo.imgurl} alt="project" />
      {/if}
    </div>
  </div>
  <div class="proj-description col-sm-5">
    <CardProject
      title={projectInfo.title}
      urls={projectInfo.urls}
      text={projectInfo.text}
      techstack={projectInfo.techstack}
    />
  </div>
</div>
<br /><br />

<style lang="scss">
  @media (max-width: 767px) {
    .main-img-container {
      padding: 0 1em;
    }
  }

  .project-container {
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
    }
    .img-container {
      align-self: center;
      position: relative;

      img.main {
        padding: 0;
        margin: 0;
        width: 100%;
        border-radius: 1rem;
      }

      img.glowing {
        box-shadow: 0 0 65px rgb(237 78 80), 0 0 0 1px rgb(255 255 255 / 10%),
          0 2px 2px rgb(0 0 0 / 3%), 0 4px 4px rgb(0 0 0 / 4%),
          0 10px 8px rgb(0 0 0 / 5%), 0 15px 15px rgb(0 0 0 / 6%),
          0 30px 30px rgb(0 0 0 / 7%), 0 70px 65px rgb(0 0 0 / 9%);
      }
    }

    img:hover {
      scale: 110%;
      transition: 0.5s;
    }
  }
</style>
