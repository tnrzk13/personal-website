<script>
  import AnimateType from "../TextType/AnimateType.svelte";
  import GradientButton from "../Button/GradientButton.svelte";
  import { magneticHover } from "../../utils/magneticHover";
  import { LINKEDIN_URL, GITHUB_URL, EMAIL, COPYRIGHT } from "../../data/contact";
  let { contactInfo, titleHeight, contactYOffset } = $props();
</script>

<div id="contact" style="height: {titleHeight - contactYOffset}px">
  <div class="textLayer">
    <div class="textLayer-preamble">{contactInfo.preamble}</div>
    <div class="textLayer-title">
      <AnimateType
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
      <div class="icon-links">
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" use:magneticHover>
          <i class="fa-brands fa-linkedin fa-md" aria-hidden="true"></i>
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" use:magneticHover>
          <i class="fa-brands fa-github fa-md" aria-hidden="true"></i>
        </a>
      </div>
      <div class="button-container-column">
        <a
          href="mailto:{EMAIL}?subject={contactInfo.subject}"
          id="emailLink"
          use:magneticHover
        >
          <GradientButton text="Say Hello" />
        </a>
      </div>
    </div>
    <p class="copyright">&copy; {COPYRIGHT}</p>
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
      padding-top: 3rem;
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

      .icon-links {
        display: flex;
        justify-content: right;
        align-items: center;
        flex: 0 0 25%;
        gap: 0.75rem;

        a {
          text-decoration: none;
          color: black;
          font-size: 3rem;
          transition: 0.5s;
        }
        a:hover {
          color: white;
          scale: 105%;
        }
      }

      .button-container-column {
        flex: 0 0 75%;
      }
    }

    .copyright {
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.5);
      margin-top: 1.5rem;
    }

    @media (max-width: 767px) {
      .button-container {
        .icon-links { flex: 0 0 100%; }
        .button-container-column { flex: 0 0 100%; }
      }
    }
  }
</style>
