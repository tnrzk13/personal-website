<script>
  import Card from "./Cards/CardCareer.svelte";
  import CardCompact from "./Cards/CardCareerCompact.svelte";
  import { cardList } from "../data/career";
  import TextReveal from "./TextReveal.svelte";
  import { reveal } from "../actions/reveal";

  const featuredCards = $derived(cardList.filter(c => c.tier === "featured"));
  const compactCards = $derived(cardList.filter(c => c.tier === "compact"));
</script>

<div id="career" class="section-inset" data-reveal-section use:reveal>
  <TextReveal text="My last couple adventures" class="section-title content-width" />
  <div id="card-list-container" class="content-width">
    <div class="card-grid">
      {#each featuredCards as { imgBase, title, subtitle, datePeriod, techstack, points, logoColor }, i}
        <Card {imgBase} {title} {subtitle} {datePeriod} {techstack} {points} {logoColor} revealDelayMs={i * 120 + 500} />
      {/each}
    </div>

    <h3 class="earlier-heading reveal" style="transition-delay: {featuredCards.length * 120 + 600}ms">Earlier Experience</h3>

    <div class="compact-grid">
      {#each compactCards as { imgBase, title, subtitle, datePeriod, points, logoColor }, i}
        <CardCompact {imgBase} {title} {subtitle} {datePeriod} {points} {logoColor} revealDelayMs={featuredCards.length * 120 + 700 + i * 100} />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  :global(h2.section-title) {
    background-image: var(--gradient-cool-sky);
  }
  #career {
    border: 1px solid transparent;
    height: auto;

    #card-list-container {
      padding: 0;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
      }
    }

    .earlier-heading {
      font-family: "Montserrat", sans-serif;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 2rem 0 1.5rem 0;
    }

    .compact-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
