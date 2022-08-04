<script>
  import Title from "./components/01-Title.svelte";
  import AboutMe from "./components/02-AboutMe.svelte";
  import Career from "./components/03-Career.svelte";
  import Projects from "./components/04-Projects.svelte";
  import ContactWrapper from "./components/05-ContactWrapper.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Intro from "./components/style2/Intro.svelte";
  import Info from "./components/Cards/CardGlass.svelte";
  import Saos from "saos";
  import { beforeUpdate, tick } from "svelte";

  window.onload = manageHeights;
  window.onresize = manageHeights;
  let titleHeight = window.screen.availWidth * 0.5625;
  let scrollHeight;

  // wait for document.body to load first
  beforeUpdate(async () => {
    await tick();
    scrollHeight = document.body.scrollHeight;
  });

  // Changes title height, gets scroll height
  function manageHeights() {
    titleHeight = window.screen.availWidth * 0.5625;
    scrollHeight = document.body.offsetHeight;
  }

  console.log(window.screen.availWidth);
</script>

<svelte:window on:resize={manageHeights} />

<div class="container-fluid">
  <Title containerHeight={titleHeight} pageHeight={scrollHeight} />
  <div class="content-container" style="top: {titleHeight}px;">
    <div class="content">
      <Saos
        animation={"fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both"}
        animation_out={"slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"}
        top={250}
        bottom={250}
      >
        <AboutMe />
      </Saos>
      <Saos
        animation={"fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both"}
        animation_out={"slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"}
        top={250}
        bottom={250}
      >
        <Career />
      </Saos>
      <Saos
        animation={"fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both"}
        animation_out={"slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"}
        top={250}
        bottom={250}
      >
        <Projects />
      </Saos>
      <!-- <Intro /> -->
      <!-- <Info /> -->
    </div>
    <div id="semi-circle" />
    <!-- to allow user to keep scrolling -->
    <div id="contact" />
    <ContactWrapper {titleHeight} />
  </div>
</div>
<Navbar {titleHeight} />

<style lang="scss">
  #contact {
    height: calc(56vw - 7.5vh);
  }

  .container-fluid {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;

    .content-container {
      position: absolute;
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      color: white;

      .content {
        background-image: linear-gradient(rgb(6, 0, 87), var(--blue));
        position: relative;
        z-index: 2;
        border-radius: 0 0 3em 3em;
      }

      #semi-circle {
        z-index: 1;
        height: 15vh;
        border-radius: 0 0 50% 50%;
        transform: translate(0, -50%);
        background-color: var(--blue);
      }
    }
  }
</style>
