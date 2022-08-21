<script>
  import Parallax from "./components/01-Title/Parallax.svelte";
  import TitleMobile from "./components/01-Title/TitleMobile.svelte";
  import AboutMe from "./components/02-AboutMe.svelte";
  import Career from "./components/03-Career.svelte";
  import Projects from "./components/04-Projects.svelte";
  import ContactText from "./components/05-Contact/ContactText.svelte";
  import ContactWrapper from "./components/05-Contact/ContactWrapper.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Loader from "./components/Loader.svelte";

  // dev mode
  let boolFadeAnimation, boolShowLoadingScreen, boolAnimateText;
  // Heights
  let titleHeight, contactHeight, contentHeight;
  // scroll
  let y;
  // top of contact component
  let contactTop = 999;
  // calculated variables
  let contactYOffset;
  let pageHalfDown = 999;
  // variables with initial values
  let boolMobileView = true;
  let medScreenSize = 768;

  let manageHeights = () => {
    // get Heights
    titleHeight = window.innerWidth * 0.5625;
    // calculations
    boolMobileView = window.innerWidth < medScreenSize;
    contactYOffset = titleHeight / 3;
    contactHeight = titleHeight - contactYOffset;
    pageHalfDown = (titleHeight + contentHeight) / 2;
    // contactTop
    contactTop = contentHeight;
  };
  window.onload = () => {
    manageHeights();
  };
  window.onresize = () => {
    manageHeights();
  };

  $: {
    // get Heights
    titleHeight = document.body.offsetWidth * 0.5625;
    // calculations
    boolMobileView = window.innerWidth < medScreenSize;
    contactYOffset = titleHeight / 3;
    contactHeight = titleHeight - contactYOffset;
    pageHalfDown = (titleHeight + contentHeight) / 2;
    // contactTop
    contactTop = contentHeight;
    // contactTop = document.getElementById("contact").offsetTop;

    // console.log(titleHeight, y);
  }

  const triggerDevMode = (isOn) => {
    boolFadeAnimation = boolShowLoadingScreen = boolAnimateText = false;
    if (!isOn) {
      boolFadeAnimation = boolShowLoadingScreen = boolAnimateText = true;
    }
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
      <div id="content" bind:clientHeight={contentHeight}>
        <AboutMe />
        <Career {boolFadeAnimation} />
        <Projects {boolMobileView} />
      </div>
      <div id="contact" style="height: 75vh;" />
      <ContactWrapper {contactInfo} />
    </div>
  </div>
  <Navbar {boolMobileView} />
{:else}
  <div class="container-fluid">
    <Parallax
      containerHeight={titleHeight}
      {pageHalfDown}
      {boolAnimateText}
      {titleInfo}
      {contactTop}
      {contactYOffset}
    />
    <div id="content-container" style="top: {titleHeight}px;">
      <div id="content" bind:clientHeight={contentHeight}>
        <AboutMe />
        <Career {boolFadeAnimation} />
        <Projects {boolMobileView} />
      </div>
      <ContactText {contactInfo} {titleHeight} {contactYOffset} />
    </div>
  </div>
  <Navbar {boolMobileView} />
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
        background-image: linear-gradient(var(--blue) 5%, var(--darkblue) 50%);
        position: relative;
        z-index: 2;
        border-radius: 0 0 50% 50% / 0 0 3em 3em;
      }
    }
  }
</style>
