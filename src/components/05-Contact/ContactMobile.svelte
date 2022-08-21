<script>
  export let contactInfo;
  import TextType from "../TextType/TextType.svelte";
</script>

<div id="contact-mobile-wrapper">
  <div class="textLayer col-sm-10 offset-sm-1">
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
      <br /><br />
    </div>
    <div class="links-container">
      <span class="linkedin-container">
        <a href="https://www.linkedin.com/in/tony-k-kwok/">
          <i class="fa-brands fa-linkedin fa-lg" />
        </a>
      </span>
      <span class="button-container">
        <a
          href="mailto:tnrzk13@gmail.com?subject={contactInfo.subject}"
          id="emailLink"
        >
          <button class="btn btn-grad btn-lg">Say Hello</button>
        </a>
      </span>
    </div>
  </div>
</div>

<style lang="scss">
  #contact-mobile-wrapper {
    height: 100vh;
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
      padding: 3.5em 0.5em 0 0.5em;

      .textLayer-preamble {
        font-size: 0.5em;
      }

      .textLayer-description {
        font-size: 0.5em;
      }

      a#emailLink {
        text-decoration: none;
      }

      .links-container {
        display: flex;
        justify-items: center;
        align-items: center;

        .linkedin-container {
          .fa-linkedin {
            text-decoration: none;
            color: white;
          }
          .fa-linkedin:hover {
            color: black;
            scale: 110%;
            transition: 0.5s;
          }
        }

        .btn-grad {
          text-align: center;
          margin: 1em;
          padding: 0.75em 2.5em;
          text-align: center;
          text-transform: uppercase;
          transition: 0.5s;
          background-size: 200% auto;
          color: white;
          box-shadow: 0 0 20px #eee;
          border: 3px solid white;
          border-radius: 10px;
          display: block;
        }

        .btn-grad:hover {
          scale: 110%;
        }

        .btn-grad:active {
          filter: brightness(50%);
        }
      }
    }
  }
</style>
