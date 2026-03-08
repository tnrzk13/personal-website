<script>
  import Card from "./Cards/CardCareer.svelte";
  import { cardList } from "../data/career";
  import TextReveal from "./TextReveal.svelte";
</script>

<div id="career" class="section-inset" data-reveal-section>
  <TextReveal text="My last couple adventures" class="section-title content-width" />
  <div id="card-list-container" class="content-width">
    <div class="card-grid">
      {#each cardList as { imgurl, title, subtitle, datePeriod, techstack, points, logoColor }, i}
        <Card {imgurl} {title} {subtitle} {datePeriod} {techstack} {points} {logoColor} revealDelayMs={i * 120 + 500} />
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
  }
</style>
