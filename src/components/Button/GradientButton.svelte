<script>
  export let text = "Button";
  export let buttonGradient;
</script>

<button class="btn btn-grad btn-lg" style="background-image: {buttonGradient};">
  {text}
</button>

<style lang="scss">
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
    font-family: "Montserrat", sans-serif;
  }

  .btn-grad:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
    scale: 110%;
  }

  .btn-grad:active {
    filter: brightness(50%);
  }
</style>
