<script>
  import Title from "./components/01-Title/TitleParallax.svelte";
  import AboutMe from "./components/02-AboutMe.svelte";
  import Career from "./components/03-Career.svelte";
  import Projects from "./components/04-Projects.svelte";
  import ContactWrapper from "./components/05-ContactWrapper.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Loader from "./components/Loader.svelte";

  import SaosWrapper from "./components/SaosWrapper.svelte";
  import { beforeUpdate, tick } from "svelte";

  let y,
    titleHeight,
    contactHeight,
    pageHalfDown,
    contactYOffset,
    body,
    contentContainer,
    contentContainerHeight,
    content,
    contentHeight;
  contentContainerHeight = 0;

  // wait for document.body to load first
  beforeUpdate(async () => {
    await tick();
    body = document.body;
    contentContainer = document.getElementById("content-container");
    content = document.getElementById("content");
    contentContainerHeight = contentContainer.offsetHeight;
    contentHeight = content.offsetHeight;
    pageHalfDown = contentContainerHeight / 2;
  });

  let manageHeights = () => {
    body = document.body;
    titleHeight = body.offsetWidth * 0.5625;
    contactYOffset = titleHeight / 3;
    contactHeight = titleHeight - contactYOffset;
  };
  window.onload = manageHeights();
  window.onresize = () => {
    titleHeight = body.offsetWidth * 0.5625;
    contactYOffset = titleHeight / 3;
    contactHeight = titleHeight - contactYOffset;
    contentContainerHeight = contentContainer.clientHeight;
    pageHalfDown = contentContainerHeight / 2;
  };

  $: {
    let clObject = {
      contentContainerHeight: contentContainerHeight,
      contentHeight: contentHeight,
      contactHeight: contactHeight,
    };
    console.log(clObject);
  }

  let boolFadeAnimation, boolShowLoadingScreen, boolAnimateText;
  const triggerDevMode = (isOn) => {
    boolFadeAnimation = boolShowLoadingScreen = boolAnimateText = false;
    if (!isOn) {
      boolFadeAnimation = boolShowLoadingScreen = boolAnimateText = true;
    }
    boolFadeAnimation = false;
  };
  triggerDevMode(false);

  let titleInfo = {
    preamble: "Hi, my name is",
    title: "Tony Kwok.",
    subtitle: "I build things with ",
    texts: ["data.", "style.", "code.", "thought."],
    description:
      "I'm a software developer who builds solutions to problems using data. Currently, I'm looking to join a company for my next adventure.",
  };
</script>

<svelte:window bind:scrollY={y} />

<div class="container-fluid">
  <Title
    containerHeight={titleHeight}
    {pageHalfDown}
    {boolAnimateText}
    {titleInfo}
  />
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
      overflow: visible;

      #content {
        background-image: linear-gradient(var(--blue), var(--darkblue));
        position: relative;
        z-index: 2;
        border-radius: 0 0 50% 50% / 0 0 3em 3em;
      }

      #contact {
        background-color: transparent;
      }
    }
  }
</style>
