<script>
  import CardProject from "../Cards/CardProject.svelte";
  import FadeInWrapper from "../Misc/FadeInWrapper.svelte";

  export let projectIndex, projectInfo, boolMobileView;
  export let boolFadeAnimation = true;
</script>

{#if projectIndex % 2 === 0 || boolMobileView}
  <div class="row project-container">
    <div class="img-container col-md-7">
      <div class="main-img-container-even col-md-10 main-img-container">
        <FadeInWrapper {boolFadeAnimation}>
          {#if projectInfo.urls.boolUrlExists}
            <a href={projectInfo.urls.projectUrl}>
              <img class="main" src={projectInfo.imgurl} alt="project" />
            </a>
          {:else}
            <img class="main" src={projectInfo.imgurl} alt="project" />
          {/if}
        </FadeInWrapper>
      </div>
    </div>
    <div class="proj-description col-md-5">
      <CardProject
        title={projectInfo.title}
        urls={projectInfo.urls}
        text={projectInfo.text}
        techstack={projectInfo.techstack}
      />
    </div>
  </div>
{:else}
  <div class="row project-container">
    <div class="proj-description col-md-5">
      <CardProject
        title={projectInfo.title}
        urls={projectInfo.urls}
        text={projectInfo.text}
        techstack={projectInfo.techstack}
      />
    </div>
    <div class="img-container col-md-7">
      <div
        class="main-img-container-odd col-md-10 offset-md-2 main-img-container"
      >
        <FadeInWrapper {boolFadeAnimation}>
          {#if projectInfo.urls.boolUrlExists}
            <a href={projectInfo.urls.projectUrl}>
              <img
                class="main main-odd"
                src={projectInfo.imgurl}
                alt="project"
              />
            </a>
          {:else}
            <img class="main main-odd" src={projectInfo.imgurl} alt="project" />
          {/if}
        </FadeInWrapper>
      </div>
    </div>
  </div>
{/if}
<br /><br />

<style lang="scss">
  @media (max-width: 767px) {
    .main-img-container {
      padding: 0 1em;
    }
  }

  .project-container {
    .proj-description {
      padding: 0;
    }
    .img-container {
      align-self: center;
      position: relative;

      .main-img-container-odd {
        right: 0;
      }

      img.main {
        padding: 0;
        margin: 0;
        width: 100%;
        border-radius: 1rem;
      }
    }

    .main-img-container:hover a {
      filter: brightness(50%);
    }
  }
</style>
