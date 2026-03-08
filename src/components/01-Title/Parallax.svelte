<script>
  import { onMount } from "svelte";
  import TextType from "../TextType/TextType.svelte";
  import { getImagePath } from "../../utils/imagePath";
  import { getContactParallax as getContactParallaxBase, getLayerScale, getLayerOpacity, getLayerOffsetPx } from "../../utils/parallax";

  let { containerHeight, titleInfo, boolAnimateText = true, pageHalfDown = 1000, contactTop, contactYOffset, footerHeight = 0, scrollY = 0 } = $props();

  const numLayers = 11;
  const layers = [...Array(numLayers).keys()];
  const textLayer = 3;
  const numImgLayers = numLayers - 1;
  let imgHeight = $state(0);
  let offsetRatio = $state(0);
  let yScroll = $state(0);
  let boolShowContact = $state(false);
  let contentBorderRadius = "3em";

  const update = () => {
    imgHeight = containerHeight - contactYOffset;
    offsetRatio = contactYOffset / containerHeight;
    yScroll = Math.max(0, scrollY - contactTop);
  };
  onMount(() => {
    update();
  });

  const getContactParallax = (layer) => {
    return getContactParallaxBase(layer, numImgLayers, imgHeight, yScroll, contactYOffset);
  };

  $effect(() => {
    boolShowContact = scrollY > pageHalfDown;
    update();
  });

  $effect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  });
</script>

<div
  id="parallax"
  class="parallax-container {boolShowContact
    ? 'contact-section'
    : 'title-section'}"
  style="height: {boolShowContact ? containerHeight : containerHeight - scrollY}px; --img-height: {boolShowContact ? `calc(100vh - ${footerHeight}px)` : '100vh'};"
>
  {#each layers as layer}
    {#if layer === 0}
      <img
        style="transform: translateY(calc({boolShowContact
          ? getContactParallax(layer) * 0.6
          : (-scrollY * layer) / (layers.length - 1)}px {boolShowContact
          ? '- ' + contentBorderRadius
          : ''})); opacity: {getLayerOpacity(layer)}"
        src={getImagePath(`images/intro/00${layer}`)}
        alt="parallax layer {layer}"
      />
    {:else if layer < textLayer}
      <img
        style="transform: translateY({(boolShowContact
          ? getContactParallax(layer)
          : (-scrollY * layer) / (layers.length - 1)) + getLayerOffsetPx(layer)}px); opacity: {getLayerOpacity(layer)}"
        src={getImagePath(`images/intro/00${layer}`)}
        alt="parallax layer {layer}"
      />
    {:else if layer === textLayer && scrollY <= Math.max(0, pageHalfDown)}
      {#if scrollY < containerHeight}
        <div class="textLayer">
          <p class="textLayer-preamble">{titleInfo.preamble}</p>
          <h1 class="textLayer-title">{titleInfo.title}</h1>
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
          <div class="scrolldown"><i class="fa-solid fa-angles-down" aria-hidden="true"></i></div>
        </div>
      {/if}
    {:else if layer >= textLayer && layer < 11}
      <img
        style="transform: translateY({(boolShowContact
          ? getContactParallax(layer)
          : (-scrollY * (layer - 1)) / (layers.length - 1)) + getLayerOffsetPx(layer)}px){getLayerScale(layer)}"
        src={getImagePath(`images/intro/00${layer - 1}`)}
        alt="parallax layer {layer - 1}"
      />
    {:else if layer >= 11}
      <img
        style="transform: translateY({boolShowContact
          ? getContactParallax(layer)
          : (-scrollY * (layer - 1)) / (layers.length - 1)}px)"
        src={getImagePath(`images/intro/0${layer - 1}`)}
        alt="parallax layer {layer - 1}"
      />
    {:else if layer === 14}
      <img
        style="transform: translateY({boolShowContact
          ? getContactParallax(layer)
          : -scrollY + 10}px)"
        src={getImagePath(`images/intro/0${layer - 1}`)}
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
      height: var(--img-height, 100vh);
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

      .textLayer-title {
        font-size: min(7vw, 12vh);
      }

      .textLayer-preamble {
        font-size: min(1.3vw, 2.5vh);
      }

      .textLayer-subtitle {
        font-size: min(3.5vw, 6vh);
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
