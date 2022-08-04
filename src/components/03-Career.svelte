<script>
  import Card from "./Cards/CardCareer.svelte";
  import { SimpleGrid } from "@svelteuidev/core";

  class CardClass {
    constructor(imgurl, title, subtitle, points, logoColor) {
      Object.assign(this, { imgurl, title, subtitle, points, logoColor });
    }
  }
  let cardList = [
    new CardClass(
      "images/03-career/white/360insights.png",
      "Full Stack Developer",
      "360insights",
      [
        "Reduced debugging time by 10 mins",
        "Increased testing efficiency by 5%",
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-telegram"
      )
    ),
    new CardClass(
      "images/03-career/white/npx.png",
      "Innovation Catalyst Intern",
      "Nuclear Promise X",
      [
        "Prevented data conflicts costing over a day in restructuring",
        "Reduced data reporting time to zero",
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-lunada"
      )
    ),
    new CardClass(
      "images/03-career/white/quarter4.png",
      "Database Specialist",
      "Quarter4",
      ["Cleaned data, allowing model prediction accuracy to rise >75%"],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-cosmic-fusion"
      )
    ),
    new CardClass(
      "images/03-career/white/marsh.png",
      "Business Application Developer",
      "Marsh",
      ["Automated 1hr of daily reporting"],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-amin"
      )
    ),
  ];
</script>

<div id="career" class="container-fluid">
  <h1 class="title col-md-9">Career</h1>
  <div class="card container-fluid col-md-10">
    <SimpleGrid cols={2}>
      {#each cardList as { imgurl, title, subtitle, points, logoColor }}
        <Card {imgurl} {title} {subtitle} {points} {logoColor} />
      {/each}
    </SimpleGrid>
  </div>
</div>

<style lang="scss">
  h1.title {
    padding-left: 0;
  }
  #career {
    border: 1px solid transparent;
  }
  .container-fluid {
    // border: 5px solid white;
    border: none;
    height: auto;

    .card {
      background-color: transparent;
      background-image: none;
    }
  }
</style>
