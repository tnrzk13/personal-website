<script>
  import ProjectInstance from "./04-Projects/ProjectInstance.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
  import { isBrowserSafari } from "./Browser/BrowserCheck.svelte";

  class Urls {
    constructor(boolUrlExists = false, projectUrl = "", codeUrl = "") {
      Object.assign(this, { boolUrlExists, projectUrl, codeUrl });
    }
  }
  class Project {
    constructor(title, imgurl, urls, text, techstack) {
      Object.assign(this, { title, imgurl, urls, text, techstack });
    }
  }

  let projList = [
    new Project(
      "This Website!",
      "images/04-project/website." + (isBrowserSafari() ? "png" : "avif"),
      new Urls(
        true,
        "https://tnrzk13.github.io/personal-website/",
        "https://github.com/tnrzk13/personal-website"
      ),
      "Learned a new framework, brushed up on html and css, created and solved lots of bugs. Came to the conclusion that Svelte.JS is the best JS framework.",
      ["Javascript", "Svelte"]
    ),
    new Project(
      "SoulDog",
      "images/04-project/souldog." + (isBrowserSafari() ? "png" : "avif"),
      new Urls(
        true,
        "https://souldog.herokuapp.com",
        "https://github.com/aarshio/SoulDog-CS348"
      ),
      'Webapp linked to database designed to match abandoned dogs with new dog owners. Features include account creation, Google authentication, search, and posting. Awarded "top project of the class" in CS348: Database Systems.',
      ["Javascript", "React", "Node.JS", "Knex JS", "SQL"]
    ),
    new Project(
      "Time Series Forecasting",
      "images/04-project/airpassengers." + (isBrowserSafari() ? "png" : "avif"),
      new Urls(true, "", "https://github.com/tnrzk13/TimeSeriesAirPassengers"),
      "Forecasted the number of air passengers using time series data. Used SARIMA and Holt-Winters Exponential Smoothing models to predict the number of passengers for the next 36 months.",
      ["Python", "SciKit Learn", "StatsModels", "Matplotlib", "Pandas", "SciPy"]
    ),
    new Project(
      "Wumpus World",
      "images/04-project/wumpus." + (isBrowserSafari() ? "png" : "avif"),
      new Urls(),
      "Modeled rpg-like problem using reinforcement learning algorithms such as Q-Learning and SARSA. Each algorithm was paired with one strategy (e.g. greedy, softmax, etc...) to find the best combination for the problem.",
      ["Python"]
    ),
  ];
</script>

<div id="projects" class="container-fluid col-sm-10 offset-sm-1">
  <h1 class="title col-md-9">Leveling up with side projects</h1>
  <div class="projects container-fluid col-md-9">
    <SimpleGrid cols={1}>
      {#each projList as projectInfo, index}
        <ProjectInstance projectIndex={index} {projectInfo} />
        <br /><br />
      {/each}
    </SimpleGrid>
  </div>
</div>

<style lang="scss">
  #projects {
    border: 1px solid transparent;

    h1.title {
      background-image: var(--gradient-relaxing-red);
    }

    .projects {
      padding: 0;
    }
  }
</style>
