<script>
  import AuroraGradient from "../background/AuroraGradient.svelte";
  import Background from "../background/Background.svelte";
</script>

<div class="container-fluid">
  <!-- <div id="content-wrapper">
    <h5>Interested?</h5>
    <h1 class="title">Get In Touch</h1>
    <div class="col-md-6 offset-md-3">
      <p>
        I'm currently looking for my next adventure. Contact me if you have any
        questions, or if you just want to say hello! My inbox is always open for
        you.
      </p>
    </div>
    <div class="button-container">
      <button class="btn btn-dark">Say Hello</button>
    </div>
  </div>
  <div id="aurora-container">
    <AuroraGradient />
  </div> -->
  <Background />
</div>

<style lang="scss">
  #box {
    background-color: blue;
  }
  .container-fluid {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: center;
    color: black;
    height: 100vh;
    display: grid;
    position: relative;

    #content-wrapper {
      position: absolute;
      justify-self: center;
      align-self: center;
      z-index: 0;
    }

    #empty {
      height: 8em;
    }

    h1.title {
      font-family: "Montserrat", sans-serif;
      font-size: 4em;
      margin: 0;
      margin-bottom: 0.25em;
    }

    .button-container {
      margin-top: 3em;
    }

    #aurora-container {
      z-index: -1;
    }
  }
</style>
