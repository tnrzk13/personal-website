<script>
  import Title from "./components/Title.svelte";
  import AboutMe from "./components/AboutMe.svelte";
  import Intro from "./components/Intro.svelte";
  import Info from "./components/Info.svelte";

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
  <div class="content">
    <AboutMe />
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
    display: flex;
    flex-direction: row;
    height: auto;
    background-color: black;
    // background-image: linear-gradient(rgb(6, 0, 87), purple, gold);
    color: black;
  }
</style>
