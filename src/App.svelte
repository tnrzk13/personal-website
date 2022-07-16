<script>
  import Title from "./components/01-Title.svelte";
  import AboutMe from "./components/02-AboutMe.svelte";
  import Career from "./components/03-Career/Career.svelte";
  import Intro from "./components/style2/Intro.svelte";
  import Info from "./components/03-Career/Card.svelte";

  window.onload = getForegroundStart;
  window.onresize = getForegroundStart;
  let foregroundTop = window.screen.availWidth * 0.5625;
  function getForegroundStart() {
    foregroundTop = window.screen.availWidth * 0.5625;
  }
  console.log(foregroundTop);
</script>

<div class="container-fluid">
  <Title />
  <div class="content" style="top: {foregroundTop}px;">
    <AboutMe />
    <Career />
    <!-- <Intro /> -->
    <!-- <Info /> -->
  </div>
</div>

<style lang="scss">
  .container-fluid {
    position: relative;
    width: 100%;
    // text-align: center;
    padding: 0;
    margin: 0;
  }

  .content {
    position: absolute;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(rgb(6, 0, 87), rgb(4, 4, 13));
    color: white;
  }
</style>
