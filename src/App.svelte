<script>
  import TitleDesktop from "./components/01-Title/TitleParallax.svelte";
  import TitleMobile from "./components/01-Title/TitleMobile.svelte";
  import AboutMe from "./components/02-AboutMe.svelte";
  import Career from "./components/03-Career.svelte";
  import Projects from "./components/04-Projects.svelte";
  import ContactWrapper from "./components/05-Contact/ContactWrapper.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Loader from "./components/Loader.svelte";

  import SaosWrapper from "./components/SaosWrapper.svelte";
  import { beforeUpdate, tick } from "svelte";

  let y,
    boolMobileView,
    medScreenSize,
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
  boolMobileView = true;
  medScreenSize = 768;

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
    boolMobileView = window.innerWidth < medScreenSize;
    body = document.body;
    titleHeight = body.offsetWidth * 0.5625;
    contactYOffset = titleHeight / 3;
    contactHeight = titleHeight - contactYOffset;
  };
  window.onload = manageHeights();
  window.onresize = () => {
    boolMobileView = window.innerWidth < medScreenSize;
    titleHeight = body.offsetWidth * 0.5625;
    contactYOffset = titleHeight / 3;
    contactHeight = titleHeight - contactYOffset;
    contentContainerHeight = contentContainer.clientHeight;
    pageHalfDown = contentContainerHeight / 2;
  };

  $: {
    boolMobileView = window.innerWidth < medScreenSize;

    let clObject = {
      boolMobileView: boolMobileView,
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
  let contactInfo = {
    preamble: "Interested?",
    title: "",
    subtitle: "",
    texts: ["Get in Touch!"],
    description:
      "I'm currently looking for my next adventure. Contact me if you have any questions, or if you just want to say hello! My inbox is always open for you.",
    subject: "Getting in touch from your website",
  };
</script>

<svelte:window bind:scrollY={y} />

{#if boolMobileView}
  <div class="container-fluid">
    <TitleMobile {boolAnimateText} {titleInfo} />
    <div id="content-container">
      <div id="content">
        <SaosWrapper {boolFadeAnimation}><AboutMe /></SaosWrapper>
        <SaosWrapper {boolFadeAnimation}><Career /></SaosWrapper>
        <SaosWrapper {boolFadeAnimation}
          ><Projects {boolMobileView} /></SaosWrapper
        >
      </div>
      <div id="contact" style="height: 75vh;" />
      <ContactWrapper
        {contactHeight}
        containerHeight={titleHeight}
        {contactYOffset}
        {pageHalfDown}
        {contactInfo}
        {boolMobileView}
      />
    </div>
  </div>
  <Navbar titleHeight={0} {boolMobileView} />
{:else}
  <div class="container-fluid">
    <TitleDesktop
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
        {contactInfo}
        {boolMobileView}
      />
    </div>
  </div>
  <Navbar {titleHeight} {boolMobileView} />
{/if}

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
