<script>
  import Card from "./Cards/CardCareer.svelte";
  import { cardList } from "../data/career";
  import TextReveal from "./TextReveal.svelte";
</script>

<div id="career" class="container-fluid col-sm-10 col-sm-1" data-reveal-section>
  <TextReveal text="My last couple adventures" class="section-title col-md-9" />
  <div id="card-list-container" class="card container-fluid col-md-9">
    <div class="card-grid">
      {#each cardList as { imgurl, title, subtitle, techstack, points, logoColor }, i}
        <Card {imgurl} {title} {subtitle} {techstack} {points} {logoColor} revealDelayMs={i * 120 + 500} />
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
  }
  .container-fluid {
    border: none;
    height: auto;

    .card {
      background-color: transparent;
      background-image: none;
    }

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
