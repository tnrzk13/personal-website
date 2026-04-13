<script>
  let { titleInfo } = $props();
  import AnimateType from "../TextType/AnimateType.svelte";
</script>

<div class="textLayerWrapper">
  <picture class="hero-bg">
    <source srcset="images/intro/000.avif" type="image/avif" />
    <img src="images/intro/000.png" alt="" role="presentation" />
  </picture>
  <div class="hero-overlay"></div>
  <div class="textLayer section-inset">
    <p class="textLayer-preamble">{titleInfo.preamble}</p>
    <h1 class="textLayer-title">{titleInfo.title}</h1>
    <div class="textLayer-description">
      {titleInfo.description}
    </div>
    <div class="textLayer-subtitle">
      {titleInfo.subtitle}
        <AnimateType
          texts={titleInfo.texts}
          delay={100}
          num_loops={1000}
          repeat_n_words={0}
          blinker_iter_count={"infinite"}
        />
    </div>
  </div>
</div>

<style lang="scss">
  .textLayerWrapper {
    position: relative;
    overflow: hidden;
    background-color: var(--darkblue);

    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
      }
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(
        to bottom,
        rgba(4, 13, 33, 0.45) 0%,
        rgba(4, 13, 33, 0.6) 40%,
        rgba(4, 13, 33, 0.92) 75%,
        var(--darkblue) 100%
      );
    }

    .textLayer {
      position: relative;
      z-index: 2;
      text-align: left;
      font-family: "Montserrat", sans-serif;
      font-size: 4rem;
      color: white;
      line-height: normal;
      padding: 2em 1rem 0.75em 1rem;

      .textLayer-preamble,
      .textLayer-description {
        font-size: 0.4em;
      }

      .textLayer-title {
        font-size: 1.5em;
        color: transparent;
        -webkit-background-clip: text;
        background-image: var(--gradient-mint-cyan);
      }

      .textLayer-subtitle {
        font-size: 0.65em;
        color: transparent;
        -webkit-background-clip: text;
        background-image: var(--gradient-mint-cyan);
        min-height: 2lh;

        :global(.blinker) {
          background-image: var(--gradient-mint-cyan);
          -webkit-background-clip: text;
        }
      }

      .textLayer-description {
        padding: 1em 0;
      }
    }
  }
</style>
