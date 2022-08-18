<script>
  export let titleInfo, boolAnimateText;
  import TextType from "../TextType/TextType.svelte";
</script>

<div class="textLayerWrapper">
  <div class="textLayer col-sm-10 offset-sm-1">
    <div class="textLayer-preamble">{titleInfo.preamble}</div>
    <div class="textLayer-title">{titleInfo.title}</div>
    <div class="textLayer-description">
      {titleInfo.description}
      <br />
    </div>
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
    <div class="scrolldown"><i class="fa-solid fa-angles-down" /></div>
  </div>
</div>

<style lang="scss">
  .textLayerWrapper {
    background-color: var(--blue);

    .textLayer {
      text-align: left;
      font-family: "Montserrat", sans-serif;
      font-size: 3em;
      color: white;
      line-height: normal;
      padding: 2em 0.25em 0 0.25em;

      .textLayer-preamble {
        font-size: 0.5em;
      }

      .textLayer-description {
        padding: 1em 0;
        font-size: 0.5em;
      }

      .scrolldown {
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
