<script>
  window.onload = getForegroundStart;
  let foregroundTop;

  function getForegroundStart() {
    let containerWidth = document.getElementById("parallax-container");
    foregroundTop = containerWidth.clientWidth * 0.5625;
  }

  const numLayers = 15;
  const layers = [...Array(numLayers).keys()];

  const textLayer = 4;
  let y; //The window scrolling
</script>

<svelte:window bind:scrollY={y} />

<!-- layer 4 is textLayer -->
<div class="parallax-container" id="parallax-container">
  {#each layers as layer}
    {#if layer < textLayer}
      <img
        style="transform: translate(0,{(-y * layer) / (layers.length - 1)}px)"
        src="images/00{layer}.png"
        alt="parallax layer {layer}"
      />
    {:else if layer === textLayer}
      <img src="images/00{layer}.png" alt="parallax layer {layer}" />
    {:else if layer > textLayer && layer < 10}
      <img
        style="transform: translate(0,{(-y * (layer - 1)) /
          (layers.length - 1)}px)"
        src="images/00{layer}.png"
        alt="parallax layer {layer}"
      />
    {:else if layer === 14}
      <img
        style="transform: translate(0,{-y}px)"
        src="images/0{layer}.png"
        alt="parallax layer {layer}"
      />
    {:else}
      <img
        style="transform: translate(0,{(-y * (layer - 1)) /
          (layers.length - 1)}px)"
        src="images/0{layer}.png"
        alt="parallax layer {layer}"
      />
    {/if}
  {/each}
</div>

<div class="text">
  <div class="foreground" style="top: {foregroundTop}px;">
    You have scrolled {y} pixels
  </div>
</div>

<style>
  :global(body) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .parallax-container {
    position: fixed;
    width: 100%;
  }

  .parallax-container img {
    position: absolute;
    width: 100%;
    will-change: transform;
  }

  .text {
    position: relative;
    width: 100%;
    height: 300vh;
    text-align: center;
  }

  .foreground {
    position: relative;
    width: 100%;
    height: 50%;
    background-color: rgb(6, 0, 87);
    color: white;
    /* padding: 50vh 0 0 0; */
  }
</style>
