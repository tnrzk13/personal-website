<script>
  import ProjectCompact from "./04-Projects/ProjectCompact.svelte";
  import { projList } from "../data/projects";
  import TextReveal from "./TextReveal.svelte";
  import { isMobile } from '../utils/mediaQuery.svelte';

  const ALL_TAG = "All";
  const tags = [ALL_TAG, ...new Set(projList.flatMap((p) => p.tags))];

  let activeTag = $state(ALL_TAG);
  let activeSlide = $state(0);
  let carouselEl = $state(null);
  let carouselHeightPx = $state(0);

  const filteredProjects = $derived(
    activeTag === ALL_TAG ? projList : projList.filter((p) => p.tags.includes(activeTag))
  );

  function updateCarouselHeight() {
    if (!carouselEl) return;
    const slides = carouselEl.querySelectorAll(".carousel-slide");
    let maxHeight = 0;
    slides.forEach(s => { if (s.offsetHeight > maxHeight) maxHeight = s.offsetHeight; });
    carouselHeightPx = maxHeight;
  }

  function getSlideStepPx() {
    if (!carouselEl) return 0;
    const slides = carouselEl.querySelectorAll(".carousel-slide");
    if (slides.length < 2) return slides[0]?.offsetWidth ?? 0;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  function handleScroll() {
    if (!carouselEl) return;
    const step = getSlideStepPx();
    if (step === 0) return;
    activeSlide = Math.round(carouselEl.scrollLeft / step);
  }

  function scrollToSlide(index) {
    if (!carouselEl) return;
    const step = getSlideStepPx();
    carouselEl.scrollTo({ left: index * step, behavior: "smooth" });
  }

  $effect(() => {
    if (!carouselEl) return;
    const slides = carouselEl.querySelectorAll(".carousel-slide");
    const images = Array.from(slides).flatMap(s => [...s.querySelectorAll("img")]);
    const onLoad = () => updateCarouselHeight();
    images.forEach(img => img.addEventListener("load", onLoad));
    updateCarouselHeight();
    return () => images.forEach(img => img.removeEventListener("load", onLoad));
  });

  $effect(() => {
    activeTag;
    activeSlide = 0;
    if (carouselEl) carouselEl.scrollLeft = 0;
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

  {#if isMobile.value}
    <div class="carousel-container content-width reveal" style="transition-delay: 250ms">
      <div
        class="carousel"
        bind:this={carouselEl}
        onscroll={handleScroll}
        style:--carousel-h="{carouselHeightPx}px"
      >
        {#each filteredProjects as projectInfo, index (projectInfo.title)}
          <div class="carousel-slide">
            <ProjectCompact {projectInfo} />
          </div>
        {/each}
      </div>
      {#if filteredProjects.length > 1}
        <div class="carousel-dots">
          {#each filteredProjects as _, index}
            <button
              class="dot"
              class:active={activeSlide === index}
              onclick={() => scrollToSlide(index)}
              aria-label="Go to project {index + 1}"
            ></button>
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <div class="compact-grid content-width">
      {#each filteredProjects as projectInfo, index (projectInfo.title)}
        <ProjectCompact {projectInfo} revealDelayMs={250 + (index + 1) * 60} />
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
    }

    .carousel-container {
      position: relative;
      // Bleed past section padding so the peeking card reaches the screen edge
      margin-right: -1rem;
      margin-bottom: 3rem;
    }

    .carousel {
      height: var(--carousel-h);
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      overscroll-behavior-x: contain;
      padding-right: 1rem;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .carousel-slide {
      flex: 0 0 85%;
      scroll-snap-align: start;
    }

    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.25rem;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.3);
      padding: 0;
      cursor: pointer;
      transition: background 0.25s ease, transform 0.25s ease;

      &.active {
        background: rgba(100, 172, 255, 0.8);
        transform: scale(1.3);
      }
    }
  }
</style>
