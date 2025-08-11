<script lang="ts">
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
    let boolShowLoadingScreen, boolAnimateText;
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
    let smScreenSize = 768;
    let mdScreenSize = 992;

    let manageHeights = () => {
        // get Heights
        titleHeight = window.innerWidth * 0.5625;
        // calculations
        boolMobileView = window.innerWidth < smScreenSize;
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
        boolMobileView = window.innerWidth < smScreenSize;
        contactYOffset = titleHeight / 3;
        contactHeight = titleHeight - contactYOffset;
        pageHalfDown = (titleHeight + contentHeight) / 2;
        // contactTop
        contactTop = contentHeight;
    }

    const triggerDevMode = (isOn) => {
        boolShowLoadingScreen = boolAnimateText = false;
        if (!isOn) {
            boolShowLoadingScreen = boolAnimateText = true;
        }
    };
    triggerDevMode(false);

    let titleInfo = {
        preamble: "Hi, my name is",
        title: "Tony Kwok.",
        subtitle: "I build things with ",
        texts: ["data.", "style.", "code."],
        description:
            "I scale SaaS from scrappy to profitable. Full-stack with a bias for measurable impact, getting things done, and owning problems end-to-end.",
    };
    let contactInfo = {
        preamble: "Interested?",
        title: "",
        subtitle: "",
        texts: ["Get in Touch!"],
        description:
            "Looking for my next adventure. Let's do it together!",
        subject: "Getting in touch from your website",
    };
</script>

<svelte:window bind:scrollY={y} />

{#if boolMobileView}
    <div class="container-fluid">
        <TitleMobile {boolAnimateText} {titleInfo} />
        <div id="content-container">
            <div
                id="content"
                class="content-mobile"
                bind:clientHeight={contentHeight}
            >
                <AboutMe />
                <Career />
                <Projects />
                <ContactWrapper {contactInfo} />
            </div>
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
            <div
                id="content"
                class="content-desktop"
                bind:clientHeight={contentHeight}
            >
                <AboutMe />
                <Career {mdScreenSize} />
                <Projects />
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
            overflow: hidden;

            #content {
                position: relative;
                z-index: 2;
                border-radius: 0 0 50% 50% / 0 0 3em 3em;
            }

            .content-desktop {
                background-image: linear-gradient(
                    var(--blue) 5%,
                    var(--darkblue) 50%
                );
            }

            .content-mobile {
                background-color: var(--darkblue);
            }
        }
    }
</style>
