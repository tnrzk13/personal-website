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
      {titleInfo.subtitle}
      {#if boolAnimateText}
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
    <br /><br />
  </div>
</div>

<style lang="scss">
  .textLayerWrapper {
    background-color: var(--darkblue);

    .textLayer {
      text-align: left;
      font-family: "Montserrat", sans-serif;
      font-size: 4rem;
      color: white;
      line-height: normal;
      padding: 2em 0.25em 0 0.25em;

      .textLayer-preamble,
      .textLayer-description {
        font-size: 0.35em;
      }

      .textLayer-title,
      .textLayer-subtitle {
        color: transparent;
        -webkit-background-clip: text;
        background-image: var(--gradient-mint-blue-dark);
      }

      .textLayer-description {
        padding: 1em 0;
      }
    }
  }
</style>
