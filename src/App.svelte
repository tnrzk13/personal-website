<script>
  import Title from "./components/01-Title.svelte";
  import AboutMe from "./components/02-AboutMe.svelte";
  import Career from "./components/03-Career.svelte";
  import Projects from "./components/04-Projects.svelte";
  import ContactWrapper from "./components/05-ContactWrapper.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Loader from "./components/Loader.svelte";

  import SaosWrapper from "./components/SaosWrapper.svelte";
  import { beforeUpdate, tick } from "svelte";

  let titleHeight,
    // scrollHeight,
    contentContainerHalfDown,
    contactHeight,
    pageHalfDown,
    contactYOffset,
    body,
    contentContainer;

  // wait for document.body to load first
  // beforeUpdate(async () => {
  //   await tick();
  //   scrollHeight = document.body.scrollHeight;
  // });

  // Changes title height, gets scroll height
  let manageHeights = () => {
    body = document.body;
    contentContainer = document.getElementById("content-container");

    titleHeight = body.scrollWidth * 0.5625;
    contactYOffset = titleHeight / 3;
    contactHeight = titleHeight - contactYOffset - body.offsetHeight * 0.075;
    // scrollHeight = body.offsetHeight;
    contentContainerHalfDown = contentContainer.offsetHeight / 2;
    pageHalfDown = contentContainerHalfDown + titleHeight;
  };
  window.onload = manageHeights;

  let boolFadeAnimation, boolShowLoadingScreen, boolAnimateText;
  const triggerDevMode = (isOn) => {
    boolFadeAnimation = boolShowLoadingScreen = boolAnimateText = false;
    if (!isOn) {
      boolFadeAnimation = boolShowLoadingScreen = boolAnimateText = true;
    }
    boolFadeAnimation = false;
  };
  triggerDevMode(false);
</script>

<svelte:window on:resize={manageHeights} />

<div class="container-fluid">
  <Title containerHeight={titleHeight} {pageHalfDown} {boolAnimateText} />
  <div id="content-container" style="top: {titleHeight}px;">
    <div id="content">
      <SaosWrapper {boolFadeAnimation}><AboutMe /></SaosWrapper>
      <SaosWrapper {boolFadeAnimation}><Career /></SaosWrapper>
      <SaosWrapper {boolFadeAnimation}><Projects /></SaosWrapper>
    </div>
    <div
      id="contact"
      style="height: calc({titleHeight - contactYOffset}px); )"
    />
    <ContactWrapper
      {contactHeight}
      containerHeight={titleHeight}
      {contactYOffset}
      {pageHalfDown}
    />
  </div>
</div>
<Navbar {titleHeight} />

<style lang="scss">
  .container-fluid {
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;

    #content-container {
      position: absolute;
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      color: white;

      #content {
        background-image: linear-gradient(var(--blue), var(--darkblue));
        position: relative;
        z-index: 2;
        border-radius: 0 0 50% 50% / 0 0 3em 3em;
      }
    }
  }
</style>
