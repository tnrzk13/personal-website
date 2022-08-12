<script>
  import CardProject from "./Cards/CardProject.svelte";
  import ProjectInstance from "./04-Projects/ProjectInstance.svelte";
  import { SimpleGrid } from "@svelteuidev/core";

  class Project {
    constructor(title, imgurl1, imgurl2, text, techstack) {
      Object.assign(this, { title, imgurl1, imgurl2, text, techstack });
    }
  }

  let projList = [
    new Project(
      "SoulDog",
      "images/04-project/souldog.PNG",
      "images/04-project/souldogcard.PNG",
      'Webapp linked to database designed to match abandoned dogs with new dog owners. Features include account creation, Google authentication, search, and posting. Awarded "top project of the class" in CS348: Database Systems.',
      ["Javascript", "React", "Node.JS", "Knex JS", "SQL"]
    ),
    new Project(
      "Wumpus World",
      "images/04-project/wumpus.PNG",
      "images/04-project/wumpuscard.PNG",
      "Modeled rpg-like problem using reinforcement learning algorithms such as Q-Learning and SARSA. Each algorithm was paired with one strategy (e.g. greedy, softmax, etc...) to find the best combination for the problem.",
      ["Python"]
    ),
  ];
</script>

<div id="projects" class="container-fluid">
  <h1 class="title col-md-9">Projects</h1>
  <div class="projects container-fluid col-md-9">
    <SimpleGrid cols={1}>
      {#each projList as { title, imgurl1, imgurl2, text, techstack }, index}
        {#if index % 2 === 0}
          <div class="row project-container">
            <div class="img-container col-md-7">
              <div
                class="main-img-container col-md-10 media-main-img-container"
              >
                <img class="main" src={imgurl1} alt="project" />
              </div>
              <img class="card media-card" src={imgurl2} alt="project 2" />
            </div>
            <div class="proj-description col-md-5">
              <CardProject {title} {text} {techstack} />
            </div>
          </div>
        {:else}
          <div class="row project-container">
            <div class="proj-description col-md-5">
              <CardProject {title} {text} {techstack} />
            </div>
            <div class="img-container col-md-7">
              <div
                class="main-img-container-odd col-md-10 offset-md-2 media-main-img-container"
              >
                <img class="main main-odd" src={imgurl1} alt="project" />
              </div>
              <img
                class="card card-odd media-card"
                src={imgurl2}
                alt="project 2"
              />
            </div>
          </div>
        {/if}
        <br /><br />
      {/each}
    </SimpleGrid>
  </div>
</div>

<style lang="scss">
  @media (max-width: 767px) {
    .media-main-img-container {
      padding: 0 1em;
    }
    .media-card {
      margin: 0 1em;
    }
  }
  #projects {
    border: 1px solid transparent;
  }
  .container-fluid {
    // border: 3px solid white;
    padding: 0;
  }

  .project-container {
    // border: 3px solid red;
    h4 {
      font-family: "Montserrat", sans-serif;
      font-size: 1.25rem;
      padding: 1.5rem 0 0.5rem 0;
    }

    .img-container {
      align-self: center;
      // border: 3px solid white;
      position: relative;
      .main-img-container-odd {
        right: 0;
      }
      img.main {
        padding: 0;
        margin: 0;
        width: 100%;
        border-radius: 1rem;
      }
      img.card {
        position: absolute;
        // height: 15em;
        width: 40%;
        max-width: 15em;
        top: 30%;
        right: 0;
        border-radius: 1em;
      }
      img.card-odd {
        top: 30%;
        left: 0;
      }
    }
  }
</style>
