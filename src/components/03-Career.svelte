<script>
  import Card from "./Cards/CardCareer.svelte";
  import CardCompact from "./Cards/CardCareerCompact.svelte";
  import { cardList } from "../data/career";
  import TextReveal from "./TextReveal.svelte";

  const WEIGHT = { featured: 3, compact: 1 };
  const allCards = [...cardList]
    .sort((a, b) => {
      if (a.tier === b.tier) return 0;
      return a.tier === "featured" ? -1 : 1;
    })
    .map((card, i) => ({ ...card, sortedIndex: i }));

  const featured = allCards.filter(c => c.tier === "featured");
  const compact = allCards.filter(c => c.tier !== "featured");

  const leftColumn = [];
  const rightColumn = [];
  let leftWeight = 0;
  let rightWeight = 0;

  // Place featured cards first
  for (const card of featured) {
    if (leftWeight <= rightWeight) {
      leftColumn.push(card);
      leftWeight += WEIGHT[card.tier];
    } else {
      rightColumn.push(card);
      rightWeight += WEIGHT[card.tier];
    }
  }

  // Greedily assign compact cards to shorter column
  for (const card of compact) {
    if (leftWeight <= rightWeight) {
      leftColumn.push(card);
      leftWeight += WEIGHT[card.tier];
    } else {
      rightColumn.push(card);
      rightWeight += WEIGHT[card.tier];
    }
  }
</script>

{#snippet renderCard(card, unifiedIndex)}
  {@const revealDelayMs = unifiedIndex * 60 + 50}
  {#if card.tier === "featured"}
    <Card imgBase={card.imgBase} title={card.title} subtitle={card.subtitle} datePeriod={card.datePeriod} techstack={card.techstack} points={card.points} logoColor={card.logoColor} {revealDelayMs} />
  {:else}
    <CardCompact imgBase={card.imgBase} title={card.title} subtitle={card.subtitle} datePeriod={card.datePeriod} points={card.points} logoColor={card.logoColor} {revealDelayMs} />
  {/if}
{/snippet}

<div id="career" class="section-inset" data-reveal-section>
  <TextReveal text="My last couple adventures" class="section-title content-width" />
  <div id="card-list-container" class="content-width">
    <div class="card-columns">
      <div class="card-column">
        {#each leftColumn as card}
          <div class="card-slot" style="order: {card.sortedIndex}">
            {@render renderCard(card, card.sortedIndex)}
          </div>
        {/each}
      </div>
      <div class="card-column">
        {#each rightColumn as card}
          <div class="card-slot" style="order: {card.sortedIndex}">
            {@render renderCard(card, card.sortedIndex)}
          </div>
        {/each}
      </div>
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

    .card-columns {
      display: flex;
      gap: 1rem;
    }

    .card-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 0;
    }

    .card-slot :global(.card-container) {
      margin-bottom: 0;
    }

    @media (max-width: 992px) {
      .card-columns {
        flex-direction: column;
      }

      .card-column {
        display: contents;
      }
    }
  }
</style>
