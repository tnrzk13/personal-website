<script>
  import ProjectInstance from "./04-Projects/ProjectInstance.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
  import { isBrowserSafari } from "./Browser/BrowserCheck.svelte";
  import Techstack from "./Misc/Techstack.svelte";

  class Urls {
    constructor(projectUrl = "", codeUrl = "") {
      Object.assign(this, { projectUrl, codeUrl });
    }
  }
  class Project {
    constructor(title, imgurl, urls, text, techstack) {
      Object.assign(this, { title, imgurl, urls, text, techstack });
    }
  }

  let techstack = [
    "Fast.ai",
    "Svelte",
    "GCP",
    "Scikit-Learn",
    "Matplotlib",
    "Knex.JS",
  ];

  let projList = [
    new Project(
      "This Website!",
      "images/04-project/website." + (isBrowserSafari() ? "png" : "avif"),
      new Urls(
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
        "https://souldog.herokuapp.com",
        "https://github.com/aarshio/SoulDog-CS348"
      ),
      'Webapp linked to database designed to match abandoned dogs with new dog owners. Features include account creation, Google authentication, search, and posting. Awarded "top project of the class" in CS348: Database Systems.',
      ["Javascript", "React", "Node.JS", "Knex JS", "SQL"]
    ),
    new Project(
      "Pneumonia Detection",
      "images/04-project/pneumoniaXrayIdentifier." +
        (isBrowserSafari() ? "png" : "avif"),
      new Urls(
        "https://huggingface.co/spaces/tnrzk13/PneumoniaDetection",
        "https://github.com/tnrzk13/PneumoniaXrayIdentifier"
      ),
      "Developed a Deep Learning model using the FastAI library that diagnoses pneumonia with a 98.5% accuracy rate from chest X-ray images.",
      ["Python", "Fast.ai", "Gradio"]
    ),
    new Project(
      "Time Series Forecasting",
      "images/04-project/airpassengers." + (isBrowserSafari() ? "png" : "avif"),
      new Urls("", "https://github.com/tnrzk13/TimeSeriesAirPassengers"),
      "Forecasted the number of air passengers using time series data. Used SARIMA and Holt-Winters Exponential Smoothing models to predict the number of passengers for the next 36 months.",
      ["Python", "SciKit Learn", "StatsModels", "Matplotlib", "Pandas", "SciPy"]
    ),
    new Project(
      "Wumpus World",
      "images/04-project/wumpus." + (isBrowserSafari() ? "png" : "avif"),
      new Urls(
        "",
        "https://gitfront.io/r/user-1077305/epuyjAbpQqjR/wumpusworld/"
      ),
      "Modeled rpg-like problem using reinforcement learning algorithms such as Q-Learning and SARSA. Each algorithm was paired with one strategy (e.g. greedy, softmax, etc...) to find the best combination for the problem.",
      ["Python"]
    ),
    new Project(
      "Chess",
      "images/04-project/chess." + (isBrowserSafari() ? "png" : "avif"),
      new Urls("", "https://gitfront.io/r/user-1077305/ELvfgXx6E716/chess/"),
      "Comprehensive implementation of Chess, featuring a self-designed user interface supporting both human-to-human and human-to-CPU gameplay across four different difficulty levels, with one against the chess engine itself - stockfish. Used design patterns like Observer and Factory Method.",
      ["C++", "Makefile"]
    ),
  ];
</script>

<div id="projects" class="container-fluid col-sm-10 offset-sm-1">
  <h1 class="title col-md-9">Leveling up with side projects</h1>
  <div class="container-fluid description col-md-9">
    My side projects reflect my dedication to innovation and problem-solving.
    From building interactive web experiences with cutting-edge technologies to
    developing AI-powered solutions, I thrive on turning ideas into impactful
    realities.
    <br /><br />
    I can learn any technology, just as I have learned the following creating these
    projects:
    <br /><br />
  </div>
  <div class="container-fluid col-md-9">
    <Techstack {techstack} />
    <br /><br /><br /><br />
  </div>
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
