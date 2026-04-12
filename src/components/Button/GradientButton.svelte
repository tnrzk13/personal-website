<script>
  let { text = "Button" } = $props();
</script>

<span class="btn-grad">
  {text}
</span>

<style lang="scss">
  .btn-grad {
    text-align: center;
    background-image: var(--gradient-button);
    margin: 1em;
    padding: 0.75em 2.5em;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.25rem;
    transition: background-position var(--hover-duration) var(--hover-ease),
      scale var(--hover-duration) var(--hover-ease);
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: inline-block;
    font-family: "Montserrat", sans-serif;
  }

  @media (hover: hover) {
    .btn-grad:hover {
      background-position: right center;
      color: #fff;
      text-decoration: none;
      scale: var(--hover-scale);
    }
  }

  .btn-grad:active {
    filter: brightness(var(--hover-active-brightness));
  }
</style>
