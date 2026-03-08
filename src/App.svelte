<script lang="ts">
    import Parallax from "./components/01-Title/Parallax.svelte";
    import TitleMobile from "./components/01-Title/TitleMobile.svelte";
    import AboutMe from "./components/02-AboutMe.svelte";
    import Career from "./components/03-Career.svelte";
    import Projects from "./components/04-Projects.svelte";
    import ContactText from "./components/05-Contact/ContactText.svelte";
    import ContactWrapper from "./components/05-Contact/ContactWrapper.svelte";
    import Navbar from "./components/Navbar.svelte";

    const smScreenSize = 768;
    const mdScreenSize = 992;

    let boolAnimateText = $state(true);
    let titleHeight = $state(0);
    let contentHeight = $state(0);
    let y = $state(0);
    let contactTop = $state(999);
    let contactYOffset = $state(0);
    let pageHalfDown = $state(999);
    let boolMobileView = $state(true);

    const manageHeights = () => {
        titleHeight = window.innerWidth * 0.5625;
        boolMobileView = window.innerWidth < smScreenSize;
        contactYOffset = titleHeight / 3;
        pageHalfDown = (titleHeight + contentHeight) / 2;
        contactTop = contentHeight;
    };

    $effect(() => {
        // Re-run when contentHeight changes (from bind:clientHeight)
        contentHeight;
        manageHeights();
    });

    $effect(() => {
        window.addEventListener("resize", manageHeights);
        return () => window.removeEventListener("resize", manageHeights);
    });

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
