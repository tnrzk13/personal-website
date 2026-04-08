<script lang="ts">
    import type { TitleInfo, ContactInfo } from "./types";
    import Lenis from "lenis";
    import "lenis/dist/lenis.css";
    import Parallax from "./components/01-Title/Parallax.svelte";
    import TitleMobile from "./components/01-Title/TitleMobile.svelte";
    import ImpactMetrics from "./components/02b-ImpactMetrics.svelte";
    import AboutMe from "./components/02-AboutMe.svelte";
    import Career from "./components/03-Career.svelte";
    import Projects from "./components/04-Projects.svelte";
    import ContactText from "./components/05-Contact/ContactText.svelte";
    import ContactMobile from "./components/05-Contact/ContactMobile.svelte";
    import Navbar from "./components/Navbar.svelte";
    import AuroraBackground from "./components/AuroraBackground.svelte";
    import { isMobile } from './utils/mediaQuery.svelte';

    let titleHeight = $state(0);
    let contentHeight = $state(0);
    let y = $state(0);
    let contactYOffset = $derived(titleHeight / 3);
    let pageHalfDown = $derived((titleHeight + contentHeight) / 2);

    const updateTitleHeight = () => {
        titleHeight = window.innerHeight;
    };

    $effect(() => {
        updateTitleHeight();
        window.addEventListener("resize", updateTitleHeight);
        return () => window.removeEventListener("resize", updateTitleHeight);
    });

    $effect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const lenis = new Lenis({ autoRaf: true, anchors: true });
        return () => lenis.destroy();
    });

    let titleInfo: TitleInfo = {
        preamble: "Hi, my name is",
        title: "Tony Kwok.",
        subtitle: "I ",
        texts: ["scale SaaS.", "ship fast.", "drive revenue."],
        description:
            "I scale SaaS from scrappy to profitable. Full-stack with a bias for measurable impact, getting things done, and owning problems end-to-end.",
    };
    let contactInfo: ContactInfo = {
        preamble: "Interested?",
        title: "",
        subtitle: "",
        texts: ["Get in Touch!"],
        description:
            "Open to growth-stage teams where I can make outsized impact. Let's build something worth scaling.",
        subject: "Getting in touch from your website",
    };
</script>

<svelte:window bind:scrollY={y} />

{#if isMobile.value}
    <div class="page-wrapper">
        <TitleMobile {titleInfo} />
        <div id="content-container">
            <main
                id="main-content"
                class="content-mobile"
                bind:clientHeight={contentHeight}
            >
                <ImpactMetrics />
                <section id="aboutme-section" aria-label="About me">
                    <AuroraBackground group="top" />
                    <AboutMe />
                </section>
                <section aria-label="Career">
                    <AuroraBackground group="career" freezeHeight />
                    <Career />
                </section>
                <section aria-label="Projects">
                    <AuroraBackground group="bottom" />
                    <Projects />
                </section>
                <footer>
                    <ContactMobile {contactInfo} />
                </footer>
            </main>
        </div>
    </div>
    <Navbar boolMobileView={isMobile.value} scrollY={y} {titleHeight} />
{:else}
    <div class="page-wrapper">
        <Parallax
            containerHeight={titleHeight}
            {pageHalfDown}
            {titleInfo}
            contactTop={contentHeight}
            {contactYOffset}
            scrollY={y}
        />
        <div id="content-container" style:--title-h="{titleHeight}px">
            <main
                id="main-content"
                class="content-desktop"
                bind:clientHeight={contentHeight}
            >
                <ImpactMetrics />
                <section id="aboutme-section" aria-label="About me">
                    <AuroraBackground group="top" />
                    <AboutMe />
                </section>
                <section aria-label="Career">
                    <AuroraBackground group="career" freezeHeight />
                    <Career />
                </section>
                <section aria-label="Projects">
                    <AuroraBackground group="bottom" />
                    <Projects />
                </section>
            </main>
            <footer>
                <ContactText {contactInfo} {titleHeight} {contactYOffset} />
            </footer>
        </div>
    </div>
    <Navbar boolMobileView={isMobile.value} scrollY={y} {titleHeight} />
{/if}

<style lang="scss">
    .page-wrapper {
        position: relative;
        width: 100%;
        padding: 0;
        margin: 0;

        #content-container {
            position: relative;
            width: 100%;
            margin-top: var(--title-h);
            height: auto;
            display: flex;
            flex-direction: column;
            color: white;
            overflow-x: clip;

            main {
                position: relative;
                z-index: 2;

                section + section {
                    padding-top: clamp(6rem, 12vw, 18rem);
                }

                section {
                    position: relative;
                    z-index: 1;
                }

                :global(.metrics-strip) {
                    position: relative;
                    z-index: 2;
                    margin-inline: auto;
                }
            }

            .content-desktop {
                border-radius: 0 0 50% 50% / 0 0 3em 3em;
                padding-bottom: 6em;
                background-image: linear-gradient(
                    var(--blue) 5%,
                    var(--darkblue) 50%
                );
                box-shadow: 0 1.5em 3em -0.5em rgba(4, 13, 33, 0.8);
            }

            .content-mobile {
                background-color: var(--darkblue);
            }

        }
    }
</style>
