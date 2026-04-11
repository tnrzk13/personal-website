<script lang="ts">
  import Techstack from "./Misc/Techstack.svelte";
  import TextReveal from "./TextReveal.svelte";
  import FlowAroundCircle from "./FlowAroundCircle.svelte";
  import { isMobile } from '../utils/mediaQuery.svelte';

  const PORTRAIT_RADIUS_PX = 160;
  const PORTRAIT_TOP_OFFSET_PX = 20;
  const BODY_FONT = "16px 'Inter', sans-serif";
  const LINE_HEIGHT_PX = 25.6; // 16px * 1.6 line-height

  let techstack = ["Python", "Typescript", "React", "Node.js", "SQL", "Firebase", "Svelte"];

  const bioParagraphs = [
    "Engineer building AI systems that go beyond chatbots - orchestrating multi-agent workflows, shipping voice-first interfaces that make websites conversational, and creating AI assistants that rival human help at scale. I care about the craft behind AI engineering: making these systems reliable, fast, and genuinely useful in production.",
    "Before going deep on AI, I spent years as a full-stack engineer shipping products that moved the needle - growing monthly revenue 150%, scaling user bases 3x, and turning multi-day manual processes into one-click automations. I bring that same bias toward measurable outcomes to everything I build.",
    "I'm always building. Side projects range from a GPU-accelerated voice dictation daemon with streaming self-correction to a Tauri desktop app that intelligently chunks audio for smartwatches. I stumbled into tech as an accounting co-op wrangling Excel data - keyboard shortcuts led to VBA, VBA led to SQL, and SQL led me out of accounting for good. More on that in the next section.",
    "Technologies I've been working with:",
  ];

</script>

<div id="aboutme" class="aboutMe section-inset" data-reveal-section>
  <TextReveal text="A little about me" class="section-title content-width" />

  {#if isMobile.value}
    <div class="about-content reveal" style="transition-delay: 150ms">
      <div class="text">
        <div class="description">
          {#each bioParagraphs as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>
        <div class="techlist1">
          <Techstack {techstack} />
        </div>
      </div>
      <div class="imgdiv">
        <div class="aboutmeimg-container">
          <a href="https://www.linkedin.com/in/tony-k-kwok/" target="_blank" rel="noopener noreferrer">
            <picture>
              <source srcset="images/02-aboutme/self.avif" type="image/avif">
              <img
                class="aboutmeimg"
                src="images/02-aboutme/self.png"
                alt="tony kwok"
                loading="lazy"
              />
            </picture>
          </a>
        </div>
      </div>
    </div>
  {:else}
    <div class="about-content reveal" style="transition-delay: 150ms">
      <FlowAroundCircle
        paragraphs={bioParagraphs}
        circleRadiusPx={PORTRAIT_RADIUS_PX}
        circleTopOffsetPx={PORTRAIT_TOP_OFFSET_PX}
        circleRightMarginPx={80}
        font={BODY_FONT}
        lineHeightPx={LINE_HEIGHT_PX}
      >
        <div class="aboutmeimg-container">
          <a href="https://www.linkedin.com/in/tony-k-kwok/" target="_blank" rel="noopener noreferrer">
            <picture>
              <source srcset="images/02-aboutme/self.avif" type="image/avif">
              <img
                class="aboutmeimg"
                src="images/02-aboutme/self.png"
                alt="tony kwok"
                loading="lazy"
              />
            </picture>
          </a>
        </div>
      </FlowAroundCircle>
      <div class="techlist1 techlist-desktop">
        <Techstack {techstack} />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @media (max-width: 767px) {
    .imgdiv {
      padding-top: 2em;
    }
  }
  .aboutMe {
    height: auto;
    color: white;
    padding-top: 6em;

    .imgdiv {
      position: relative;
      box-sizing: border-box;
      display: grid;
      flex: 0 0 41.67%;
      .aboutmeimg-container {
        justify-self: center;
        align-self: center;
      }
    }

    .aboutmeimg-container {
      img.aboutmeimg {
        max-width: 20em;
        height: auto;
        border-radius: 50%;
        transition: 0.5s;
      }

      img.aboutmeimg:hover {
        scale: 105%;
        box-shadow: 0 0 65px #6dd5fa, 0 0 0 1px rgb(255 255 255 / 10%),
          0 2px 2px rgb(0 0 0 / 3%), 0 4px 4px rgb(0 0 0 / 4%),
          0 10px 8px rgb(0 0 0 / 5%), 0 15px 15px rgb(0 0 0 / 6%),
          0 30px 30px rgb(0 0 0 / 7%), 0 70px 65px rgb(0 0 0 / 9%);
      }
    }

    :global(h2.section-title) {
      margin-bottom: 0.5em;
      background-image: var(--gradient-pink-blue);
    }
    .about-content {
      display: flex;
      flex-wrap: wrap;
      max-width: 75%;
      margin-inline: auto;
    }
    .text {
      box-sizing: border-box;
      font-size: 1em;
      flex: 0 0 58.33%;
    }
    .description {
      box-sizing: border-box;

      p {
        margin: 0 0 1em 0;
      }

      p:last-child {
        margin-bottom: 0.5em;
      }
    }
    .techlist-desktop {
      margin-top: 1em;
      width: 100%;
    }
  }

  @media (max-width: 1023px) {
    .aboutMe {
      .about-content { max-width: 100%; }
    }
  }

  @media (max-width: 767px) {
    .aboutMe {
      .text { flex: 0 0 100%; }
      .imgdiv { flex: 0 0 100%; }
    }
  }
</style>
