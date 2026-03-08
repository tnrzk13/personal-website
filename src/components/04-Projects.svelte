<script>
  import ProjectInstance from "./04-Projects/ProjectInstance.svelte";
  import Techstack from "./Misc/Techstack.svelte";
  import { projList } from "../data/projects";
  import TextReveal from "./TextReveal.svelte";
  import { reveal } from "../actions/reveal";

  let techstack = [
    "Fast.ai",
    "Svelte",
    "GCP",
    "Scikit-Learn",
    "Matplotlib",
    "Knex.JS",
  ];
</script>

<div id="projects" class="section-inset" data-reveal-section use:reveal>
  <TextReveal text="Leveling up with side projects" class="section-title content-width" />
  <div class="description content-width reveal" style="transition-delay: 400ms">
    I can learn any technology, and I thrive on turning ideas into impactful realities. Here's some of the tech I've picked up on my own:
  </div>
  <div class="techstack-container content-width reveal" style="transition-delay: 450ms">
    <Techstack {techstack} />
  </div>
  <div class="projects content-width">
    {#each projList as projectInfo, index}
      <ProjectInstance projectIndex={index} {projectInfo} />
    {/each}
  </div>
</div>

<style lang="scss">
  #projects {
    border: 1px solid transparent;

    :global(h2.section-title) {
      background-image: var(--gradient-relaxing-red);
    }

    .description {
      margin-bottom: 1em;
    }

    .techstack-container {
      margin-bottom: 3em;
    }

    .projects {
      padding: 0;
    }
  }
</style>
