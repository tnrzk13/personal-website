<script>
  import CardProject from "../Cards/CardProject.svelte";

  export let projectIndex;
  export let project;
</script>

{#if projectIndex % 2 === 0}
  <div class="row project-container">
    <div class="img-container col-md-7">
      <div class="main-img-container col-md-10">
        <img class="main" src={project.imgurl1} alt="project" />
      </div>
      <img class="card" src={project.imgurl2} alt="project 2" />
    </div>
    <div class="proj-description col-md-5">
      <CardProject
        title={project.title}
        text={project.text}
        techstack={project.techstack}
      />
    </div>
  </div>
{:else}
  <div class="row project-container">
    <div class="proj-description col-md-5">
      <CardProject
        title={project.title}
        text={project.text}
        techstack={project.techstack}
      />
    </div>
    <div class="img-container col-md-7">
      <div class="main-img-container-odd col-md-10 offset-md-2">
        <img class="main main-odd" src={project.imgurl1} alt="project" />
      </div>
      <img class="card card-odd" src={project.imgurl2} alt="project 2" />
    </div>
  </div>
{/if}
<br /><br />
