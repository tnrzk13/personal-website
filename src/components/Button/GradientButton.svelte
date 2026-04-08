<script>
  let { text = "Button" } = $props();
</script>

<span class="btn-grad">
  {text}
</span>

<style lang="scss">
  .btn-grad {
    text-align: center;
    background-image: var(--gradient-button-blue-purple);
    margin: 1em;
    padding: 0.75em 2.5em;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.25rem;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: inline-block;
    font-family: "Montserrat", sans-serif;
  }

  .btn-grad:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
    scale: 105%;
  }

  .btn-grad:active {
    filter: brightness(50%);
  }
</style>
