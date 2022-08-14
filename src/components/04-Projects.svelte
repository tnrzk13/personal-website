<script>
  import CardProject from "./Cards/CardProject.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
  export let boolMobileView = false;

  class Project {
    constructor(title, imgurl1, imgurl2, url, text, techstack) {
      Object.assign(this, { title, imgurl1, imgurl2, url, text, techstack });
    }
  }

  let projList = [
    new Project(
      "SoulDog",
      "images/04-project/souldog.PNG",
      "images/04-project/souldogcard.PNG",
      "https://souldog.herokuapp.com",
      'Webapp linked to database designed to match abandoned dogs with new dog owners. Features include account creation, Google authentication, search, and posting. Awarded "top project of the class" in CS348: Database Systems.',
      ["Javascript", "React", "Node.JS", "Knex JS", "SQL"]
    ),
    new Project(
      "Wumpus World",
      "images/04-project/wumpus.PNG",
      "images/04-project/wumpuscard.PNG",
      "",
      "Modeled rpg-like problem using reinforcement learning algorithms such as Q-Learning and SARSA. Each algorithm was paired with one strategy (e.g. greedy, softmax, etc...) to find the best combination for the problem.",
      ["Python"]
    ),
  ];
</script>

<div id="projects" class="container-fluid col-sm-10 offset-sm-1">
  <h1 class="title col-md-9">Projects</h1>
  <div class="projects container-fluid col-md-9">
    <SimpleGrid cols={1}>
      {#each projList as { title, imgurl1, imgurl2, url, text, techstack }, index}
        {#if index % 2 === 0 || boolMobileView}
          <div class="row project-container">
            <div class="img-container col-md-7">
              <div class="main-img-container-even col-md-10 main-img-container">
                {#if url === ""}
                  <img class="main" src={imgurl1} alt="project" />
                {:else}
                  <a href={url}>
                    <img class="main" src={imgurl1} alt="project" />
                  </a>
                {/if}
              </div>
              <img class="card" src={imgurl2} alt="project 2" />
            </div>
            <div class="proj-description col-md-5">
              <CardProject {title} {url} {text} {techstack} />
            </div>
          </div>
        {:else}
          <div class="row project-container">
            <div class="proj-description col-md-5">
              <CardProject {title} {url} {text} {techstack} />
            </div>
            <div class="img-container col-md-7">
              <div
                class="main-img-container-odd col-md-10 offset-md-2 main-img-container"
              >
                {#if url === ""}
                  <img class="main main-odd" src={imgurl1} alt="project" />
                {:else}
                  <a href={url}>
                    <img class="main main-odd" src={imgurl1} alt="project" />
                  </a>
                {/if}
              </div>
              <img class="card card-odd" src={imgurl2} alt="project 2" />
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
    .main-img-container {
      padding: 0 1em;
    }
    .card {
      margin: 0 1em;
    }
  }

  #projects {
    border: 1px solid transparent;
  }

  .container-fluid {
    padding: 0;
  }

  .project-container {
    .proj-description {
      padding: 0;
    }
    .img-container {
      align-self: center;
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

    .main-img-container:hover a {
      filter: brightness(50%);
    }
  }
</style>
