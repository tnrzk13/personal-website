<script>
  import ProjectInstance from "./04-Projects/ProjectInstance.svelte";
  import ProjectCompact from "./04-Projects/ProjectCompact.svelte";
  import { projList } from "../data/projects";
  import TextReveal from "./TextReveal.svelte";
  import { reveal } from "../actions/reveal";

  const featuredProjects = projList.filter((p) => p.featured);
  const otherProjects = projList.filter((p) => !p.featured);
  const otherBaseDelayMs = featuredProjects.length * 100 + 550;
</script>

<div id="projects" class="section-inset" data-reveal-section use:reveal>
  <TextReveal text="Leveling up with side projects" class="section-title content-width" />
  <div class="description content-width reveal" style="transition-delay: 400ms">
    I can learn any technology, and I thrive on turning ideas into impactful realities. Here are some of the projects I've built on my own:
  </div>
  <div class="projects content-width">
    {#each featuredProjects as projectInfo, index}
      <ProjectInstance projectIndex={index} {projectInfo} />
    {/each}
  </div>

  {#if otherProjects.length > 0}
    <h3 class="other-heading content-width reveal" style="transition-delay: {otherBaseDelayMs}ms">
      Other Projects
    </h3>
    <div class="compact-grid content-width">
      {#each otherProjects as projectInfo, index}
        <ProjectCompact {projectInfo} delayMs={otherBaseDelayMs + (index + 1) * 100} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  #projects {
    border: 1px solid transparent;

    :global(h2.section-title) {
      background-image: var(--gradient-relaxing-red);
    }

    .description {
      margin-bottom: 3em;
    }

    .projects {
      padding: 0;
    }

    .other-heading {
      font-family: "Montserrat", sans-serif;
      font-size: 1.5rem;
      color: white;
      margin-top: 2em;
      margin-bottom: 1.5em;
    }

    .compact-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5em;
      padding: 0;

      @media (max-width: 767px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
