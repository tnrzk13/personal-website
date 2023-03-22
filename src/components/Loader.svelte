<script>
  import { fade } from "svelte/transition";

  let loadingText = "Tony Kwok";
  loadingText = loadingText.toUpperCase().split("");
  let loadingTextLength = loadingText.length;

  export let boolShowLoadingScreen;
  window.onload = () => {
    setTimeout((boolShowLoadingScreen = false), 3000);
  };
</script>

{#if boolShowLoadingScreen}
  <div id="loading-screen" class="loading container-fluid" transition:fade>
    <div class="loading-text container-fluid">
      {#each loadingText as letter, index}
        <span style="animation-delay: {index / loadingTextLength}s;"
          >{letter}</span
        >
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--blue);
    z-index: 999;
    display: grid;
  }

  .loading-text {
    position: fixed;
    margin: auto;
    text-align: center;
    justify-self: center;
    align-self: center;
    span {
      display: inline-block;
      margin: 0 0.5em;
      color: #fff;
      font-family: "Montserrat", sans-serif;
      font-size: 2em;
      animation: un-blur 0.5s infinite linear alternate;
      filter: blur(5px);
    }
  }

  @keyframes un-blur {
    100% {
      filter: blur(0);
    }
  }
</style>
