<script>
  import TextType from "../TextType/TextType.svelte";
  import GradientButton from "../Button/GradientButton.svelte";
  let { contactInfo, titleHeight, contactYOffset } = $props();
</script>

<div id="contact" style="height: calc({titleHeight - contactYOffset}px); )">
  <div class="textLayer">
    <div class="textLayer-preamble">{contactInfo.preamble}</div>
    <div class="textLayer-title">
      <TextType
        texts={contactInfo.texts}
        delay={100}
        num_loops={999}
        repeat_n_words={1}
        blinker_iter_count={"infinite"}
      />
    </div>
    <div class="textLayer-description">
      {contactInfo.description}
    </div>
    <div class="button-container">
      <div class="linkedin-container">
        <a href="https://www.linkedin.com/in/tony-k-kwok/" aria-label="LinkedIn profile">
          <i class="fa-brands fa-linkedin fa-md" aria-hidden="true"></i>
        </a>
      </div>
      <div class="button-container-column">
        <a
          href="mailto:thisistonykwok@gmail.com?subject={contactInfo.subject}"
          id="emailLink"
        >
          <GradientButton
            text="Say Hello"
            buttonGradient={getComputedStyle(
              document.querySelector(":root")
            ).getPropertyValue("--gradient-button-blue-purple")}
          />
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  #contact {
    background-color: transparent;
    z-index: 999;

    .textLayer {
      position: absolute;
      text-align: left;
      font-size: 5vw;
      font-family: "Montserrat", sans-serif;
      color: black;
      left: 1.5em;
      right: 54%;
      line-height: normal;
      padding-top: 5rem;
      margin-top: 0;
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
      display: flex;
      flex-wrap: wrap;
      font-size: 1rem;

      .linkedin-container {
        display: flex;
        justify-content: right;
        align-items: center;
        flex: 0 0 25%;

        a {
          text-decoration: none;
          color: black;
          font-size: 3rem;
          transition: 0.5s;
        }
        a:hover {
          color: white;
          scale: 110%;
        }
      }

      .button-container-column {
        flex: 0 0 75%;
      }
    }

    @media (max-width: 767px) {
      .button-container {
        .linkedin-container { flex: 0 0 100%; }
        .button-container-column { flex: 0 0 100%; }
      }
    }
  }
</style>
