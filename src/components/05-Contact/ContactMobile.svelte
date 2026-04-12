<script>
  import AnimateType from "../TextType/AnimateType.svelte";
  import IconLinkedIn from "../Icons/IconLinkedIn.svelte";
  import IconGitHub from "../Icons/IconGitHub.svelte";
  import { LINKEDIN_URL, GITHUB_URL, EMAIL, COPYRIGHT } from "../../data/contact";
  let { contactInfo } = $props();
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
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
          <IconLinkedIn />
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
          <IconGitHub />
        </a>
      </span>
      <span class="button-container">
        <a
          href="mailto:{EMAIL}?subject={contactInfo.subject}"
          id="emailLink"
        >
          <span class="btn-grad">Say Hello</span>
        </a>
      </span>
    </div>
    <p class="copyright">&copy; {COPYRIGHT}</p>
  </div>
</div>

<style lang="scss">
  #contact-mobile-wrapper {
    min-height: auto;
    background-color: var(--darkblue);
    .textLayer {
      align-self: center;
      text-align: left;
      font-family: "Montserrat", sans-serif;
      font-size: 3em;
      color: white;
      line-height: normal;
      padding: 2em 0.5em 0.5em 0.5em;

      .textLayer-preamble {
        font-size: 0.5em;
      }

      .textLayer-title {
        // Reserve 2 lines so typing animation doesn't cause layout shift
        min-height: 2.5em;
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
        justify-content: center;
        align-items: center;
        font-size: 0.5em;

        .icon-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;

          :global(svg) {
            width: 1em;
            height: 1em;
          }

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
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
      margin-top: 1.5em;
      padding-bottom: 1.5em;
    }
  }
</style>
