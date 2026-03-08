<script>
  import ProjectInstance from "./04-Projects/ProjectInstance.svelte";
  import Techstack from "./Misc/Techstack.svelte";
  import { projList } from "../data/projects";

  let techstack = [
    "Fast.ai",
    "Svelte",
    "GCP",
    "Scikit-Learn",
    "Matplotlib",
    "Knex.JS",
  ];
</script>

<div id="projects" class="container-fluid col-sm-10 offset-sm-1">
  <h1 class="title col-md-9">Leveling up with side projects</h1>
  <div class="container-fluid description col-md-9">
    I can learn any technology, and I thrive on turning ideas into impactful realities. Here's some of the tech I've picked up on my own:
    <br /><br />
  </div>
  <div class="container-fluid col-md-9">
    <Techstack {techstack} />
    <br /><br /><br /><br />
  </div>
  <div class="projects container-fluid col-md-9">
    {#each projList as projectInfo, index}
      <ProjectInstance projectIndex={index} {projectInfo} />
      <br /><br />
    {/each}
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
