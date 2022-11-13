<script>
  import { onMount } from "svelte";
  import TextType from "../TextType/TextType.svelte";
  import { isBrowserSafari } from "../Browser/BrowserCheck.svelte";

  export let containerHeight, titleInfo;
  export let boolAnimateText = true;
  export let pageHalfDown = 1000;
  export let contactTop, contactYOffset;

  const numLayers = 11;
  const layers = [...Array(numLayers).keys()];
  const textLayer = 3;
  const numImgLayers = numLayers - 1;
  let y, imgHeight, offsetRatio, yScroll;
  let boolShowContact = false;
  let contentBorderRadius = "3em";

  const update = () => {
    imgHeight = containerHeight - contactYOffset;
    offsetRatio = contactYOffset / containerHeight;
    yScroll = Math.max(0, y - contactTop);
  };
  onMount(() => {
    update();
  });
  window.onresize = () => {
    update();
  };

  // calculates img shift when scrolling on the contact section
  // the contact section is 2/3 the size of the title, so we only want to shift by 2/3 the amount
  const getContactParallax = (layer) => {
    const layerize = (x) => {
      return (x * layer) / numImgLayers;
    };
    const reverseLayerize = (x) => {
      return (x * (numImgLayers - layer)) / numImgLayers;
    };
    const titlebarHeight = screen.height - window.innerHeight;
    return Math.max(
      0,
      layerize(imgHeight - yScroll) + reverseLayerize(contactYOffset)
    );
  };

  $: {
    boolShowContact = y > pageHalfDown;
    update();
  }
</script>

<svelte:window bind:scrollY={y} />

<div
  id="parallax"
  class="parallax-container {boolShowContact
    ? 'contact-section'
    : 'title-section'}"
  style="height: {boolShowContact ? containerHeight : containerHeight - y}px;"
>
  {#each layers as layer}
    {#if layer === 0}
      <img
        style="transform: translateY(calc({boolShowContact
          ? getContactParallax(layer)
          : (-y * layer) / (layers.length - 1)}px {boolShowContact
          ? '- ' + contentBorderRadius
          : ''}))"
        src="images/intro/00{layer}.{isBrowserSafari() ? 'png' : 'avif'}"
        alt="parallax layer {layer}"
      />
    {:else if layer < textLayer}
      <img
        style="transform: translateY({boolShowContact
          ? getContactParallax(layer)
          : (-y * layer) / (layers.length - 1)}px)"
        src="images/intro/00{layer}.{isBrowserSafari() ? 'png' : 'avif'}"
        alt="parallax layer {layer}"
      />
    {:else if layer === textLayer && y <= Math.max(0, pageHalfDown)}
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
                blinker_iter_count={10}
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
    {:else if layer >= textLayer && layer < 11}
      <img
        style="transform: translateY({boolShowContact
          ? getContactParallax(layer)
          : (-y * (layer - 1)) / (layers.length - 1)}px)"
        src="images/intro/00{layer - 1}.{isBrowserSafari() ? 'png' : 'avif'}"
        alt="parallax layer {layer - 1}"
      />
    {:else if layer >= 11}
      <img
        style="transform: translateY({boolShowContact
          ? getContactParallax(layer)
          : (-y * (layer - 1)) / (layers.length - 1)}px)"
        src="images/intro/0{layer - 1}.{isBrowserSafari() ? 'png' : 'avif'}"
        alt="parallax layer {layer - 1}"
      />
    {:else if layer === 14}
      <img
        style="transform: translateY({boolShowContact
          ? getContactParallax(layer)
          : -y + 10}px)"
        src="images/intro/0{layer - 1}.{isBrowserSafari() ? 'png' : 'avif'}"
        alt="parallax layer {layer - 1}"
      />
    {/if}
  {/each}
</div>

<style lang="scss">
  .contact-section {
    bottom: 0;
  }

  .parallax-container {
    position: fixed;
    width: 100%;

    img {
      position: absolute;
      width: 100%;
      height: auto;
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
