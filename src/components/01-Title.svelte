<script>
  import TextType from "./TextType/TextTypeTitle.svelte";

  export let containerHeight;
  export let boolAnimateText = true;
  export let pageHalfDown = 1000;

  const numLayers = 15;
  const layers = [...Array(numLayers).keys()];
  const textLayer = 4;

  let y; //The window scrolling
  let texts = ["data.", "style.", "code.", "thought."];
</script>

<svelte:window bind:scrollY={y} />

{#if y <= Math.max(0, pageHalfDown)}
  <div
    id="title"
    class="parallax-container"
    style="height: {containerHeight - y}px;"
  >
    {#each layers as layer}
      {#if layer < textLayer}
        <img
          style="transform: translate(0,{(-y * layer) / (layers.length - 1)}px)"
          src="images/intro/00{layer}.png"
          alt="parallax layer {layer}"
        />
      {:else if layer === textLayer}
        {#if y < containerHeight}
          <div class="textLayer">
            <div class="textLayer-preamble">Hi, my name is</div>
            <div class="textLayer-title">Tony Kwok</div>
            <div class="textLayer-subtitle">
              I build things with {#if boolAnimateText}
                <TextType {texts} />
              {:else}
                data.
              {/if}
            </div>
            <div class="textLayer-description">
              I'm a software developer who builds solutions to problems using
              data. Currently, I'm looking to join a company for my next
              adventure.
            </div>
            <div class="scrolldown"><i class="fa-solid fa-angles-down" /></div>
          </div>
        {/if}
      {:else if layer > textLayer && layer < 11}
        <img
          style="transform: translate(0,{(-y * (layer - 1)) /
            (layers.length - 1)}px)"
          src="images/intro/00{layer - 1}.png"
          alt="parallax layer {layer - 1}"
        />
      {:else if layer === 14}
        <img
          style="transform: translate(0,{-y + 10}px)"
          src="images/intro/0{layer - 1}.png"
          alt="parallax layer {layer - 1}"
        />
      {:else}
        <img
          style="transform: translate(0,{(-y * (layer - 1)) /
            (layers.length - 1)}px)"
          src="images/intro/0{layer - 1}.png"
          alt="parallax layer {layer - 1}"
        />
      {/if}
    {/each}
  </div>
{/if}

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
      background-image: linear-gradient(180deg, white, #c531ad, white, #c531ad);
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
