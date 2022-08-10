<script>
  import TextType from "./TextType/TextType.svelte";

  export let containerHeight, contactYOffset;

  const numLayers = 15;
  const layers = [...Array(numLayers).keys()];
  const textLayer = 14;

  let subject = "Getting in touch from your website";
  let texts = ["Get in Touch!"];
  let contactDiv = document.getElementById("contact");

  let contactTop, yDiff, y, yScroll, imgHeight, offsetRatio;
  const update = () => {
    contactTop = contactDiv.offsetTop;
    yDiff = y - contactTop;
    imgHeight = containerHeight - contactYOffset;
    offsetRatio = contactYOffset / containerHeight;
    yScroll = Math.max(0, yDiff);
  };
  window.onload = update();
  window.onresize = update();

  $: {
    yDiff = y - contactTop;
    yScroll = Math.max(0, yDiff);
  }
</script>

<svelte:window bind:scrollY={y} />

<div class="parallax-container">
  {#each layers as layer}
    {#if layer === textLayer}
      <div
        class="textLayer"
        style="transform: translate(0,{imgHeight - yScroll}px)"
      >
        <div class="textLayer-preamble">Interested?</div>
        <div class="textLayer-title">
          <TextType
            {texts}
            delay={100}
            num_loops={2}
            repeat_n_words={1}
            blinker_iter_count={9}
          />
        </div>
        <div class="textLayer-description">
          I'm currently looking for my next adventure. Contact me if you have
          any questions, or if you just want to say hello! My inbox is always
          open for you.
        </div>
        <div class="button-container row">
          <div class="linkedin-container col-md-3">
            <a href="https://www.linkedin.com/in/tony-k-kwok/">
              <i class="fa-brands fa-linkedin fa-md" />
            </a>
          </div>
          <div class="button-container-column col-md-9">
            <a href="mailto:tnrzk13@gmail.com?subject={subject}" id="emailLink">
              <button class="btn btn-grad btn-lg">Say Hello</button>
            </a>
          </div>
        </div>
      </div>
    {:else if layer < 10}
      <img
        style="transform: translate(0,{imgHeight *
          (layer / (layers.length - 1)) -
          (yScroll * (1 + offsetRatio) * layer) / (layers.length - 1)}px)"
        src="images/intro/00{layer}.png"
        alt="parallax layer {layer}"
      />
    {:else}
      <img
        style="transform: translate(0,{(imgHeight * layer) /
          (layers.length - 1) -
          (yScroll * (1 + offsetRatio) * layer) / (layers.length - 1)}px)"
        src="images/intro/0{layer}.png"
        alt="parallax layer {layer}"
      />
    {/if}
  {/each}
</div>

<style lang="scss">
  #background-bottom {
    position: absolute;
    width: 100%;
    height: 50em;
    background-color: rgb(6, 0, 87);
  }

  .parallax-container {
    position: relative;
    width: 100%;

    img {
      position: absolute;
      width: 100%;
      will-change: transform;
      left: 0;
      bottom: 0;
    }

    .textLayer {
      position: absolute;
      text-align: left;
      font-size: 5vw;
      font-family: "Montserrat", sans-serif;
      color: black;
      left: 1.5em;
      right: 54%;
      bottom: 5em;
      line-height: normal;
      padding-top: 0;
      margin-top: 0;
      // border: 3px solid black;
      display: grid;
    }

    .textLayer-preamble {
      font-size: 1.3vw;
      font-family: "Montserrat", sans-serif;
    }

    .textLayer-title {
      font-family: "Montserrat", sans-serif;
    }

    .textLayer-description {
      font-size: 1.3vw;
      right: 80%;
      font-family: "Montserrat", sans-serif;
    }

    a#emailLink {
      text-decoration: none;
    }

    .button-container {
      // justify-self: center;

      .linkedin-container {
        // border: 3px solid white;
        display: flex;
        justify-content: right;
        align-items: center;

        a {
          text-decoration: none;
          color: black;
        }
        a:hover {
          color: white;
        }
      }

      .btn-grad {
        text-align: center;
        background-image: linear-gradient(
          to right,
          #24c6dc 0%,
          #514a9d 51%,
          #24c6dc 100%
        );
        margin: 1em;
        padding: 0.75em 2.5em;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20px #eee;
        border-radius: 10px;
        display: block;
      }

      .btn-grad:hover {
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
      }

      .btn-grad:active {
        filter: brightness(50%);
      }
    }
  }
</style>
