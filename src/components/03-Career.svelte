<script>
  import Card from "./Cards/CardCareer.svelte";
  import { SimpleGrid } from "@svelteuidev/core";

  export let boolFadeAnimation = false;

  class CardClass {
    constructor(imgurl, title, subtitle, techstack, points, logoColor) {
      Object.assign(this, {
        imgurl,
        title,
        subtitle,
        techstack,
        points,
        logoColor,
      });
    }
  }
  let cardList = [
    new CardClass(
      "images/03-career/360insights.avif",
      "Full Stack Developer",
      "360insights",
      ["Javascript", "Node.JS", "React"],
      [
        "Reduced debugging time by 10 mins",
        "Increased testing efficiency by 5%",
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-telegram"
      )
    ),
    new CardClass(
      "images/03-career/npx.avif",
      "Innovation Catalyst Intern",
      "Nuclear Promise X",
      ["MSPowerApps", "PowerBI", "SQL", "Python"],
      [
        "Prevented data conflicts costing over a day in restructuring",
        "Reduced data reporting time to zero",
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-lunada"
      )
    ),
    new CardClass(
      "images/03-career/quarter4.avif",
      "Database Specialist",
      "Quarter4",
      ["Python", "SQL"],
      ["Cleaned data, allowing model prediction accuracy to rise >75%"],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-cosmic-fusion"
      )
    ),
    new CardClass(
      "images/03-career/marsh.avif",
      "Business Application Developer",
      "Marsh",
      ["VBA"],
      ["Automated 1hr of daily reporting"],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-amin"
      )
    ),
  ];
</script>

<div id="career" class="container-fluid col-sm-10 col-sm-1">
  <h1 class="title col-md-9">My last couple adventures</h1>
  <div id="card-list-container" class="card container-fluid col-md-9">
    <SimpleGrid cols={2}>
      {#each cardList as { imgurl, title, subtitle, techstack, points, logoColor }}
        <Card
          {imgurl}
          {title}
          {subtitle}
          {techstack}
          {points}
          {logoColor}
          {boolFadeAnimation}
        />
      {/each}
    </SimpleGrid>
  </div>
</div>

<style lang="scss">
  h1.title {
    background-image: var(--gradient-cool-sky);
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

    #card-list-container {
      padding: 0;
    }
  }
</style>
