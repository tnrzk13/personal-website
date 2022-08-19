<script>
  import IntersectionObserver from "svelte-intersection-observer";
  import { fade } from "svelte/transition";
  import Techstack from "../Misc/Techstack.svelte";

  export let boolFadeAnimation = false;
  let node;
  export let imgurl;
  export let title;
  export let subtitle;
  export let points;
  export let logoColor;
  export let techstack;
</script>

{#if boolFadeAnimation}
  <IntersectionObserver once element={node} let:intersecting>
    <span bind:this={node}>
      {#if intersecting}
        <span class="fade-in" transition:fade={{ delay: 200 }}>
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
                  {#each points as point, index}
                    <li>{point}</li>
                  {/each}
                </p>
              </div>
            </div>
          </div></span
        >
      {/if}
    </span>
  </IntersectionObserver>
{/if}

<style lang="scss">
  .card-container {
    padding: 0;

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
        filter: grayscale(100%);
        // filter: brightness(0%);
      }
    }
  }
</style>
