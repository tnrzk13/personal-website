<script>
  import { onMount } from "svelte";
  import TextType from "../TextType/TextType.svelte";
  import { isBrowserSafari } from "../Browser/BrowserCheck.svelte";

  let { containerHeight, titleInfo, boolAnimateText = true, pageHalfDown = 1000, contactTop, contactYOffset } = $props();

  const numLayers = 11;
  const layers = [...Array(numLayers).keys()];
  const textLayer = 3;
  const numImgLayers = numLayers - 1;
  let y = $state(0);
  let imgHeight = $state(0);
  let offsetRatio = $state(0);
  let yScroll = $state(0);
  let boolShowContact = $state(false);
  let contentBorderRadius = "3em";

  const update = () => {
    imgHeight = containerHeight - contactYOffset;
    offsetRatio = contactYOffset / containerHeight;
    yScroll = Math.max(0, y - contactTop);
  };
  onMount(() => {
    update();
  });

  // calculates img shift when scrolling on the contact section
  // the contact section is 2/3 the size of the title, so we only want to shift by 2/3 the amount
  const getContactParallax = (layer) => {
    const layerize = (x) => {
      return (x * layer) / numImgLayers;
    };
    const reverseLayerize = (x) => {
      return (x * (numImgLayers - layer)) / numImgLayers;
    };
    return Math.max(
      0,
      layerize(imgHeight - yScroll) + reverseLayerize(contactYOffset)
    );
  };

  $effect(() => {
    boolShowContact = y > pageHalfDown;
    update();
  });

  const getLayerScale = (layer) => {
    if (layer >= 7) return " scale(1.04)";
    if (layer >= 5) return " scale(1.02)";
    return "";
  };

  const getLayerOpacity = (layer) => {
    if (layer === 0) return 0.85;
    if (layer === 1) return 0.92;
    return 1;
  };

  const getLayerOffsetPx = (layer) => {
    if (layer >= 9) return 10;
    if (layer >= 7) return 25;
    if (layer >= 5) return 40;
    if (layer >= 4) return 50;
    if (layer >= 1) return 50;
    return 0;
  };

  $effect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  });
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
          : ''})); opacity: {getLayerOpacity(layer)}"
        src="images/intro/00{layer}.{isBrowserSafari() ? 'png' : 'avif'}"
        alt="parallax layer {layer}"
      />
    {:else if layer < textLayer}
      <img
        style="transform: translateY({(boolShowContact
          ? getContactParallax(layer)
          : (-y * layer) / (layers.length - 1)) + getLayerOffsetPx(layer)}px); opacity: {getLayerOpacity(layer)}"
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
        style="transform: translateY({(boolShowContact
          ? getContactParallax(layer)
          : (-y * (layer - 1)) / (layers.length - 1)) + getLayerOffsetPx(layer)}px){getLayerScale(layer)}"
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
      height: 100vh;
      object-fit: cover;
      object-position: center bottom;
      will-change: transform;
      left: 0;
    }

    .textLayer {
      position: absolute;
      text-align: left;
      font-size: min(5vw, 9vh);
      font-family: "Montserrat", sans-serif;
      color: black;
      left: 1.5em;
      right: 54%;
      top: 10%;
      line-height: normal;
      padding-top: 0;
      margin-top: 0;

      .textLayer-preamble {
        font-size: min(1.3vw, 2.5vh);
      }

      .textLayer-subtitle {
        font-size: min(4.5vw, 8vh);
      }

      .textLayer-description {
        font-size: min(1.3vw, 2.5vh);
        right: 80%;
      }

      .scrolldown {
        font-size: min(2.5vw, 4vh);
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
