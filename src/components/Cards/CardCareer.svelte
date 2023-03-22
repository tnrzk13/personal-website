<script>
  import Techstack from "../Misc/Techstack.svelte";
  import FadeInWrapper from "../Misc/FadeInWrapper.svelte";

  export let boolFadeAnimation = false;
  export let imgurl;
  export let title;
  export let subtitle;
  export let points;
  export let logoColor;
  export let techstack;
</script>

<FadeInWrapper {boolFadeAnimation}>
  <div class="container-fluid card-container">
    <div class="card m-2 cb1 text-center">
      <div class="card-body">
        <div class="circle-logo" style="background-image: {logoColor}">
          <img class="logo" src={imgurl} alt="company logo" />
        </div>
        <h4 class="card-title">{title}</h4>
        <h6 class="card-subtitle">{subtitle}</h6>
        <div class="techstack-wrapper">
          <Techstack {techstack} />
        </div>
        <p class="card-text">
          {#each points as point}
            <li>
              {#each point as part}
                {#if part.style === "bold"}
                  <b>{part.text}</b>
                {:else}
                  <span class="point-part"> {part.text}</span>
                {/if}
              {/each}
            </li>
          {/each}
        </p>
      </div>
    </div>
  </div>
</FadeInWrapper>

<style lang="scss">
  .card-container {
    padding: 0;
    margin-bottom: 2.5rem;
    // box-shadow: 0 0 65px #6dd5fa, 0 0 0 1px rgb(255 255 255 / 10%),
    //   0 2px 2px rgb(0 0 0 / 3%), 0 4px 4px rgb(0 0 0 / 4%),
    //   0 10px 8px rgb(0 0 0 / 5%), 0 15px 15px rgb(0 0 0 / 6%),
    //   0 30px 30px rgb(0 0 0 / 7%), 0 70px 65px rgb(0 0 0 / 9%);

    .card {
      color: white;
      border-radius: 1rem;
      border: none;
      background-color: transparent;
    }
    .card-body {
      text-align: left;
      padding: 0;
      h4 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.25rem;
        padding: 1.5rem 0 0.5rem 0;
      }
      h6 {
        font-size: 1.15rem;
        padding-bottom: 0.5rem;
        color: rgb(200, 200, 200);
      }

      span.point-part {
        color: rgb(200, 200, 200);
      }
    }
    .circle-logo {
      width: 5em;
      height: 5em;
      border-radius: 50%;
      display: grid;
      img.logo {
        width: 4em;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        align-self: center;
        justify-self: center;
      }
    }

    .techstack-wrapper {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
</style>
