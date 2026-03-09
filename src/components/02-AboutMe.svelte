<script>
  import Techstack from "./Misc/Techstack.svelte";
  import { getImagePath } from "../utils/imagePath";
  import TextReveal from "./TextReveal.svelte";
  import { reveal } from "../actions/reveal";

  let techstack = ["Typescript", "React", "Python", "SQL", "Node.JS", "Firebase"];
</script>

<div id="aboutme" class="aboutMe section-inset" data-reveal-section use:reveal>
  <TextReveal text="A little about me" class="section-title content-width" />
  <div class="about-content reveal" style="transition-delay: 400ms">
    <div class="text">
      <div class="description">
        <p>Full-stack engineer (TS/React/GCP). I've tripled revenue, 10x'd throughput, and turned companies profitable. I thrive where shipping, reliability, and revenue are on the scorecard - and I own all three.</p>
        <p>I stumbled into tech as an accounting co-op wrangling Excel data - keyboard shortcuts led to VBA, VBA led to SQL, and SQL led me out of accounting for good. More on that in the next section.</p>
        <p>Technologies I've been working with:</p>
      </div>
      <div class="techlist1">
          <Techstack {techstack} />
      </div>
    </div>
    <div class="imgdiv">
      <div class="aboutmeimg-container">
        <a href="https://www.linkedin.com/in/tony-k-kwok/" target="_blank" rel="noopener noreferrer">
          <img
            class="aboutmeimg"
            src={getImagePath("images/02-aboutme/self")}
            alt="tony kwok"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  </div>
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
        img.aboutmeimg {
          max-width: 15em;
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
  }

  @media (max-width: 767px) {
    .aboutMe {
      .about-content { max-width: 100%; }
      .text { flex: 0 0 100%; }
      .imgdiv { flex: 0 0 100%; }
    }
  }
</style>
