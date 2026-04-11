<script>
  import ProjectCompact from "./04-Projects/ProjectCompact.svelte";
  import CardProjectCompact from "./Cards/CardProjectCompact.svelte";
  import { projList } from "../data/projects";
  import TextReveal from "./TextReveal.svelte";
  import { balanceColumns } from "../utils/balanceColumns";

  const ALL_TAG = "All";
  const COMPACT_BREAKPOINT_PX = 640;
  const WEIGHT = { featured: 3, compact: 1 };
  const tags = [ALL_TAG, ...new Set(projList.flatMap((p) => p.tags))];

  let activeTag = $state(ALL_TAG);
  let isNarrow = $state(window.innerWidth < COMPACT_BREAKPOINT_PX);

  const filteredProjects = $derived(
    activeTag === ALL_TAG ? projList : projList.filter((p) => p.tags.includes(activeTag))
  );

  const columns = $derived.by(() => balanceColumns(filteredProjects, WEIGHT));

  $effect(() => {
    const mql = window.matchMedia(`(max-width: ${COMPACT_BREAKPOINT_PX - 1}px)`);
    const onChange = (e) => { isNarrow = e.matches; };
    mql.addEventListener("change", onChange);
    isNarrow = mql.matches;
    return () => mql.removeEventListener("change", onChange);
  });
</script>

<div id="projects" class="section-inset" data-reveal-section>
  <TextReveal text="Built with passion" class="section-title content-width" />
  <div class="description content-width reveal" style="transition-delay: 150ms">
    I can learn any technology, and I thrive on turning ideas into impactful realities. Here are some of the projects I've built on my own:
  </div>

  <div class="filter-tabs content-width reveal" style="transition-delay: 200ms">
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

  {#snippet renderProject(proj)}
    {@const revealDelayMs = 250 + (proj.sortedIndex + 1) * 60}
    {#if proj.tier === "featured"}
      <ProjectCompact projectInfo={proj} {revealDelayMs} />
    {:else}
      <CardProjectCompact
        title={proj.title}
        imgBase={proj.imgBase}
        urls={proj.urls}
        text={proj.text}
        details={proj.details}
        techstack={proj.techstack}
        {revealDelayMs}
      />
    {/if}
  {/snippet}

  {#if isNarrow}
    <div class="compact-stack content-width">
      {#each filteredProjects as proj, i (proj.title)}
        {@const revealDelayMs = 250 + (i + 1) * 60}
        <CardProjectCompact
          title={proj.title}
          imgBase={proj.imgBase}
          urls={proj.urls}
          text={proj.text}
          details={proj.details}
          techstack={proj.techstack}
          {revealDelayMs}
        />
      {/each}
    </div>
  {:else}
    <div class="project-columns content-width">
      <div class="project-column">
        {#each columns.left as proj (proj.title)}
          <div class="project-slot" style="order: {proj.sortedIndex}">
            {@render renderProject(proj)}
          </div>
        {/each}
      </div>
      <div class="project-column">
        {#each columns.right as proj (proj.title)}
          <div class="project-slot" style="order: {proj.sortedIndex}">
            {@render renderProject(proj)}
          </div>
        {/each}
      </div>
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

    .compact-stack {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .project-columns {
      display: flex;
      gap: 1.5rem;
    }

    .project-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      min-width: 0;
    }
  }
</style>
