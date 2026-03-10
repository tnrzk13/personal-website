<script lang="ts">
    import type { TitleInfo, ContactInfo } from "./types";
    import Lenis from "lenis";
    import "lenis/dist/lenis.css";
    import Parallax from "./components/01-Title/Parallax.svelte";
    import TitleMobile from "./components/01-Title/TitleMobile.svelte";
    import ImpactMetrics from "./components/02b-ImpactMetrics.svelte";
    import AboutMe from "./components/02-AboutMe.svelte";
    import Career from "./components/03-Career.svelte";
    import Testimonials from "./components/03b-Testimonials/Testimonials.svelte";
    import Projects from "./components/04-Projects.svelte";
    import ContactText from "./components/05-Contact/ContactText.svelte";
    import ContactMobile from "./components/05-Contact/ContactMobile.svelte";
    import Navbar from "./components/Navbar.svelte";
    import { SM_SCREEN_PX } from "./utils/breakpoints";

    let titleHeight = $state(0);
    let contentHeight = $state(0);
    let y = $state(0);
    let contactTop = $state(999);
    let contactYOffset = $state(0);
    let pageHalfDown = $state(999);
    let boolMobileView = $state(true);

    const manageHeights = () => {
        titleHeight = window.innerHeight;
        boolMobileView = window.innerWidth < SM_SCREEN_PX;
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

{#if boolMobileView}
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
                    <AboutMe />
                </section>
                <section aria-label="Career">
                    <Career />
                </section>
                <!-- <section id="testimonials-section" aria-label="Testimonials">
                    <Testimonials />
                </section> -->
                <section aria-label="Projects">
                    <Projects />
                </section>
                <footer>
                    <ContactMobile {contactInfo} />
                </footer>
            </main>
        </div>
    </div>
    <Navbar {boolMobileView} scrollY={y} />
{:else}
    <div class="page-wrapper">
        <Parallax
            containerHeight={titleHeight}
            {pageHalfDown}
            {titleInfo}
            {contactTop}
            {contactYOffset}
            scrollY={y}
        />
        <div id="content-container" style="margin-top: {titleHeight}px;">
            <main
                id="main-content"
                class="content-desktop"
                bind:clientHeight={contentHeight}
            >
                <ImpactMetrics />
                <section id="aboutme-section" aria-label="About me">
                    <AboutMe />
                </section>
                <section aria-label="Career">
                    <Career />
                </section>
                <!-- <section id="testimonials-section" aria-label="Testimonials">
                    <Testimonials />
                </section> -->
                <section aria-label="Projects" class="projects-section">
                    <Projects />
                </section>
            </main>
            <div class="curve-shadow"></div>
            <footer>
                <ContactText {contactInfo} {titleHeight} {contactYOffset} />
            </footer>
        </div>
    </div>
    <Navbar {boolMobileView} scrollY={y} />
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
            height: auto;
            display: flex;
            flex-direction: column;
            color: white;
            overflow-x: hidden;

            main {
                position: relative;
                z-index: 2;

                section + section {
                    padding-top: clamp(6rem, 12vw, 18rem);
                }
            }

            .content-desktop {
                border-radius: 0 0 50% 50% / 0 0 3em 3em;
                background-image: linear-gradient(
                    var(--blue) 5%,
                    var(--darkblue) 50%
                );
            }

            .content-mobile {
                background-color: var(--darkblue);
            }

            .projects-section {
                padding-bottom: 4em;
            }

            .curve-shadow {
                position: relative;
                width: 100%;
                height: 0;
                z-index: 3;
                pointer-events: none;

                &::before {
                    content: '';
                    position: absolute;
                    top: -5em;
                    left: 0;
                    right: 0;
                    height: 10em;
                    background: radial-gradient(
                        80% 100% at 50% 0%,
                        #040d21 15%,
                        rgba(4, 13, 33, 0.65) 45%,
                        rgba(4, 13, 33, 0.25) 70%,
                        transparent
                    );
                    pointer-events: none;
                }
            }

        }
    }
</style>
