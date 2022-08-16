<script>
  import TextType from "../TextType/TextType.svelte";
  export let contactInfo;
</script>

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
  <div class="button-container row">
    <div class="linkedin-container col-md-3">
      <a href="https://www.linkedin.com/in/tony-k-kwok/">
        <i class="fa-brands fa-linkedin fa-md" />
      </a>
    </div>
    <div class="button-container-column col-md-9">
      <a
        href="mailto:tnrzk13@gmail.com?subject={contactInfo.subject}"
        id="emailLink"
      >
        <button class="btn btn-grad btn-lg">Say Hello</button>
      </a>
    </div>
  </div>
</div>

<style lang="scss">
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
</style>
