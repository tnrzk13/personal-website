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
        {#if projectInfo.urls.boolUrlExists}
          <FadeInWrapper {boolFadeAnimation}>
            <a href={projectInfo.urls.projectUrl}>
              <img
                class="main glowing"
                src={projectInfo.imgurl}
                alt="project"
              />
            </a>
          </FadeInWrapper>
        {:else}
          <img class="main" src={projectInfo.imgurl} alt="project" />
        {/if}
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
        {#if projectInfo.urls.boolUrlExists}
          <FadeInWrapper {boolFadeAnimation}>
            <a href={projectInfo.urls.projectUrl}>
              <img
                class="main main-odd glowing"
                src={projectInfo.imgurl}
                alt="project"
              />
            </a>
          </FadeInWrapper>
        {:else}
          <img class="main main-odd" src={projectInfo.imgurl} alt="project" />
        {/if}
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
