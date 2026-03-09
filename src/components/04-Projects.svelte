<script>
  import ProjectCompact from "./04-Projects/ProjectCompact.svelte";
  import { projList } from "../data/projects";
  import TextReveal from "./TextReveal.svelte";
  import { reveal } from "../actions/reveal";

  const ALL_TAG = "All";
  const tags = [ALL_TAG, ...new Set(projList.flatMap((p) => p.tags))];

  let activeTag = $state(ALL_TAG);

  const filteredProjects = $derived(
    activeTag === ALL_TAG ? projList : projList.filter((p) => p.tags.includes(activeTag))
  );
</script>

<div id="projects" class="section-inset" data-reveal-section use:reveal>
  <TextReveal text="Leveling up with side projects" class="section-title content-width" />
  <div class="description content-width reveal" style="transition-delay: 400ms">
    I can learn any technology, and I thrive on turning ideas into impactful realities. Here are some of the projects I've built on my own:
  </div>

  <div class="filter-tabs content-width reveal" style="transition-delay: 500ms">
    {#each tags as tag}
      <button
        class="filter-tab"
        class:active={activeTag === tag}
        onclick={() => activeTag = tag}
      >
        {tag}
      </button>
    {/each}
  </div>

  <div class="compact-grid content-width">
    {#each filteredProjects as projectInfo, index (projectInfo.title)}
      <ProjectCompact {projectInfo} delayMs={550 + (index + 1) * 100} />
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
      margin-bottom: 2em;
    }

    .filter-tabs {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 2.5em;
    }

    .filter-tab {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 1.05rem;
      font-weight: 600;
      padding: 0.45em 1.5em;
      border-radius: 999px;
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      background: transparent;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;

      &:hover {
        color: white;
        border-color: rgba(255, 255, 255, 0.4);
      }

      &.active {
        color: white;
        border-color: rgba(100, 172, 255, 0.7);
        background: rgba(100, 172, 255, 0.15);
      }
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
