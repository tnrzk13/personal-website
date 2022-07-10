<script>
  const numLayers = 15;
  const layers = [...Array(numLayers).keys()];
  const textLayer = 4;
  let containerHeight = window.screen.availWidth * 0.5625;
  let preamble = "Hi, my name is";
  let title = "Tony Kwok.";
  let subtitle = "I build things with data.";
  let description =
    "I'm a software developer specializing in building solutions to problems using data. Currently, I'm looking to join a company for my next adventure.";

  window.onresize = getContainerHeight;
  function getContainerHeight() {
    containerHeight = window.screen.availWidth * 0.5625;
  }

  let y; //The window scrolling
</script>

<svelte:window bind:scrollY={y} />

<!-- layer 4 is textLayer -->
<div class="parallax-container" style="height: {containerHeight - y}px;">
  <!-- to speed up run time, only load if in the top section -->
  <!-- {#if y < containerHeight} -->
  <!-- add a 700px to give the images/intro time to load -->
  {#each layers as layer}
    {#if layer < textLayer}
      <img
        style="transform: translate(0,{(-y * layer) / (layers.length - 1)}px)"
        src="images/intro/00{layer}.png"
        alt="parallax layer {layer}"
      />
    {:else if layer === textLayer}
      <div class="textLayer">
        <div class="textLayer-preamble">{preamble}</div>
        <div class="textLayer-title">{title}</div>
        <div class="textLayer-subtitle">{subtitle}</div>
        <div class="textLayer-description">{description}</div>
        <div class="scrolldown"><i class="fa-solid fa-angles-down" /></div>
      </div>
      <!-- <img src="images/intro/00{layer}.png" alt="parallax layer {layer}" /> -->
    {:else if layer > textLayer && layer < 10}
      <img
        style="transform: translate(0,{(-y * (layer - 1)) /
          (layers.length - 1)}px)"
        src="images/intro/00{layer}.png"
        alt="parallax layer {layer}"
      />
    {:else if layer === 14}
      <img
        style="transform: translate(0,{-y}px)"
        src="images/intro/0{layer}.png"
        alt="parallax layer {layer}"
      />
    {:else}
      <img
        style="transform: translate(0,{(-y * (layer - 1)) /
          (layers.length - 1)}px)"
        src="images/intro/0{layer}.png"
        alt="parallax layer {layer}"
      />
    {/if}
  {/each}
  <!-- {/if} -->
</div>

<style lang="scss">
  .parallax-container {
    position: fixed;
    width: 100%;

    img {
      position: absolute;
      width: 100%;
      will-change: transform;
      left: 0;
    }

    .textLayer {
      position: absolute;
      text-align: left;
      font-size: 5vw;
      font-family: "Montserrat", sans-serif;
      color: black;
      left: 1.5em;
      right: 54%;
      top: 1em;
      line-height: normal;
      padding-top: 0;
      margin-top: 0;
      // border: 3px solid black;
    }

    .textLayer-preamble {
      font-size: 1.3vw;
      font-family: "Montserrat", sans-serif;
    }

    .textLayer-title {
      font-family: "Montserrat", sans-serif;
    }

    .textLayer-subtitle {
      font-family: "Montserrat", sans-serif;
      font-size: 5vw;
    }

    .textLayer-description {
      font-size: 1.3vw;
      right: 80%;
      font-family: "Montserrat", sans-serif;
    }

    .scrolldown {
      font-size: 3vw;
      padding-top: 0.5em;
      text-align: center;
      background-image: linear-gradient(
        180deg,
        #1600a7,
        #eb419e,
        #1600a7,
        #eb419e
      );
      // background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-size: 100% 300%;
      animation: animateBg 2s infinite linear;
    }
    @keyframes animateBg {
      0% {
        background-position: bottom;
      }
      100% {
        background-position: top;
      }
    }
  }
</style>
