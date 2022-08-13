<script>
  import TextType from "../TextType/TextType.svelte";

  export let containerHeight;
  export let boolAnimateText = true;
  export let pageHalfDown = 1000;
  export let titleInfo;

  const numLayers = 15;
  const layers = [...Array(numLayers).keys()];
  const textLayer = 4;

  let y;
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
          id="img-parallax-{layer}"
          style="transform: translate(0,{(-y * layer) / (layers.length - 1)}px)"
          src="images/intro/00{layer}.png"
          alt="parallax layer {layer}"
          height={containerHeight}
        />
      {:else if layer === textLayer}
        {#if y < containerHeight}
          <div class="textLayer">
            <div class="textLayer-preamble">{titleInfo.preamble}</div>
            <div class="textLayer-title">{titleInfo.title}</div>
            <div class="textLayer-subtitle">
              {titleInfo.subtitle}{#if boolAnimateText}
                <TextType
                  texts={titleInfo.texts}
                  delay={100}
                  num_loops={2}
                  repeat_n_words={1}
                  blinker_iter_count={14}
                />
              {:else}
                {titleInfo.texts[0]}
              {/if}
            </div>
            <div class="textLayer-description">
              {titleInfo.description}
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
          height={containerHeight}
        />
      {:else if layer === 14}
        <img
          style="transform: translate(0,{-y + 10}px)"
          src="images/intro/0{layer - 1}.png"
          alt="parallax layer {layer - 1}"
          height={containerHeight}
        />
      {:else}
        <img
          style="transform: translate(0,{(-y * (layer - 1)) /
            (layers.length - 1)}px)"
          src="images/intro/0{layer - 1}.png"
          alt="parallax layer {layer - 1}"
          height={containerHeight}
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
      top: 10%;
      line-height: normal;
      padding-top: 0;
      margin-top: 0;

      .textLayer-preamble {
        font-size: 1.3vw;
      }

      .textLayer-subtitle {
        font-size: 5vw;
      }

      .textLayer-description {
        font-size: 1.3vw;
        right: 80%;
      }

      .scrolldown {
        font-size: 3vw;
        padding-top: 0.5em;
        text-align: center;
        background-image: linear-gradient(
          180deg,
          white,
          #c531ad,
          white,
          #c531ad
        );
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
  }
</style>
