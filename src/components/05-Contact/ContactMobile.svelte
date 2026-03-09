<script>
  let { contactInfo } = $props();
  import AnimateType from "../TextType/AnimateType.svelte";
</script>

<div id="contact-mobile-wrapper">
  <div class="textLayer section-inset">
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
    <div class="links-container">
      <span class="icon-links">
        <a href="https://www.linkedin.com/in/tony-k-kwok/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
          <i class="fa-brands fa-linkedin fa-lg" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/tnrzk13" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
          <i class="fa-brands fa-github fa-lg" aria-hidden="true"></i>
        </a>
      </span>
      <span class="button-container">
        <a
          href="mailto:thisistonykwok@gmail.com?subject={contactInfo.subject}"
          id="emailLink"
        >
          <span class="btn-grad" role="button">Say Hello</span>
        </a>
      </span>
    </div>
    <p class="copyright">&copy; 2025 Tony Kwok</p>
  </div>
</div>

<style lang="scss">
  #contact-mobile-wrapper {
    min-height: auto;
    background-image: linear-gradient(
      109.6deg,
      rgba(62, 161, 219, 1) 11.2%,
      rgba(93, 52, 236, 1) 100.2%
    );
    .textLayer {
      align-self: center;
      text-align: left;
      font-family: "Montserrat", sans-serif;
      font-size: 3em;
      color: white;
      line-height: normal;
      padding: 3.5em 0.5em 2em 0.5em;

      .textLayer-preamble {
        font-size: 0.5em;
      }

      .textLayer-description {
        font-size: 0.5em;
        margin-bottom: 1em;
      }

      a#emailLink {
        text-decoration: none;
      }

      .links-container {
        display: flex;
        justify-items: center;
        align-items: center;
        font-size: 0.5em;

        .icon-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;

          a {
            text-decoration: none;
            color: white;
            transition: 0.5s;
          }
          a:hover {
            color: black;
            scale: 105%;
          }
        }

        .btn-grad {
          text-align: center;
          margin: 1em;
          padding: 0.5em 1.75em;
          text-transform: uppercase;
          font-size: 0.85em;
          transition: 0.5s;
          background-size: 200% auto;
          color: white;
          box-shadow: 0 0 20px #eee;
          border: 3px solid white;
          border-radius: 10px;
          display: block;
        }

        .btn-grad:hover {
          scale: 105%;
        }

        .btn-grad:active {
          filter: brightness(50%);
        }
      }
    }

    .copyright {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      padding-bottom: 2em;
    }
  }
</style>
