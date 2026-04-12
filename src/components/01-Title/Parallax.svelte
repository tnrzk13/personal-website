<script>
  import { onMount } from "svelte";
  import AnimateType from "../TextType/AnimateType.svelte";
  import KineticTitle from "./KineticTitle.svelte";
  import { getContactParallax as getContactParallaxBase, getLayerScale, getLayerOpacity, getLayerOffsetPx } from "../../utils/parallax";

  let { containerHeight, titleInfo, pageHalfDown = 1000, contactTop, contactYOffset, scrollY = 0 } = $props();

  const numLayers = 11;
  const layers = [...Array(numLayers).keys()];
  const textLayer = 3;
  const numImgLayers = numLayers - 1;
  const parallaxSpeedDivisor = numImgLayers - 1;
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

  const contactParallaxSpeed = 1.2;
  const getContactParallax = (layer) => {
    return getContactParallaxBase(layer, numImgLayers, imgHeight, yScroll * contactParallaxSpeed, contactYOffset);
  };

  let rafId = 0;
  $effect(() => {
    // Read reactive deps to subscribe
    const currentScrollY = scrollY;
    const currentPageHalfDown = pageHalfDown;

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      boolShowContact = currentScrollY > currentPageHalfDown;
      update();
    });

    return () => cancelAnimationFrame(rafId);
  });

  $effect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  });

  const titleScrollTranslateY = (layer) => (-scrollY * layer) / parallaxSpeedDivisor;

  let layerStyles = $derived.by(() => {
    return layers.map((layer) => {
      if (layer === 0) {
        const translateY = boolShowContact
          ? getContactParallax(layer) * 0.7
          : titleScrollTranslateY(layer);
        const borderRadiusOffset = boolShowContact ? ` - ${contentBorderRadius}` : "";
        return `transform: translateY(calc(${translateY}px${borderRadiusOffset})); opacity: ${getLayerOpacity(layer)}`;
      }

      if (layer < textLayer) {
        const baseTranslateY = boolShowContact
          ? getContactParallax(layer)
          : titleScrollTranslateY(layer);
        const translateY = baseTranslateY + getLayerOffsetPx(layer);
        return `transform: translateY(${translateY}px); opacity: ${getLayerOpacity(layer)}`;
      }

      if (layer > textLayer) {
        const imgLayer = layer - 1;
        const baseTranslateY = boolShowContact
          ? getContactParallax(layer)
          : (-scrollY * imgLayer) / parallaxSpeedDivisor;
        const translateY = baseTranslateY + getLayerOffsetPx(layer);
        const scale = getLayerScale(layer);
        return `transform: translateY(${translateY}px)${scale}`;
      }

      return "";
    });
  });
</script>

<div
  id="parallax"
  class="parallax-container {boolShowContact
    ? 'contact-section'
    : 'title-section'}"
  style:--parallax-h="{boolShowContact ? containerHeight : containerHeight - scrollY}px"
>
  {#each layers as layer}
    {#if layer === 0}
      <picture>
        <source srcset="images/intro/00{layer}.avif" type="image/avif">
        <img
          style={layerStyles[layer]}
          src="images/intro/00{layer}.png"
          alt="parallax layer {layer}"
        />
      </picture>
    {:else if layer < textLayer}
      <picture>
        <source srcset="images/intro/00{layer}.avif" type="image/avif">
        <img
          loading="lazy"
          style={layerStyles[layer]}
          src="images/intro/00{layer}.png"
          alt="parallax layer {layer}"
        />
      </picture>
    {:else if layer === textLayer && scrollY <= Math.max(0, pageHalfDown)}
      {#if scrollY < containerHeight}
        <div class="textLayer">
          <p class="textLayer-preamble">{titleInfo.preamble}</p>
          <h1 class="textLayer-title sr-only">{titleInfo.title}</h1>
          <KineticTitle
            text={titleInfo.title}
            fontFamily="'Montserrat', sans-serif"
            fontWeight={700}
            color="black"
            visible={scrollY < containerHeight}
          />
          <div class="textLayer-subtitle">
            {titleInfo.subtitle}<AnimateType
                texts={titleInfo.texts}
                delay={100}
                num_loops={1000}
                repeat_n_words={0}
                blinker_iter_count={"infinite"}
              />
          </div>
          <div class="textLayer-description">
            {titleInfo.description}
          </div>
        </div>
      {/if}
    {:else if layer >= textLayer && layer < 11}
      <picture>
        <source srcset="images/intro/00{layer - 1}.avif" type="image/avif">
        <img
          loading="lazy"
          style={layerStyles[layer]}
          src="images/intro/00{layer - 1}.png"
          alt="parallax layer {layer - 1}"
        />
      </picture>
    {/if}
  {/each}
</div>

<style lang="scss">
  .contact-section {
    top: auto;
    bottom: 0;
  }

  .parallax-container {
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--parallax-h);

    img {
      position: absolute;
      width: 100%;
      height: 100vh;
      object-fit: cover;
      object-position: center bottom;
      will-change: transform;
      left: 0;
      pointer-events: none;
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

    }
  }
</style>
