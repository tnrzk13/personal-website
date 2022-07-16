<script>
  import IntroPoints from "./IntroPoints.svelte";
  import IntroPic from "./IntroPic.svelte";

  window.onload = getForegroundStart;
  window.onresize = getForegroundStart;
  let foregroundTop;
  function getForegroundStart() {
    foregroundTop = window.screen.availWidth * 0.5625;
  }
</script>

<div class="intro" style="top: {foregroundTop}px;">
  <IntroPoints />
  <IntroPic />
</div>

<style>
  .intro {
    position: absolute;
    width: 100%;
    height: auto;
    background-image: linear-gradient(rgb(6, 0, 87), purple, gold);
    color: white;
    border-radius: 0 0 1.5em 1.5em;
    /* padding: 50vh 0 0 0; */
  }
</style>
