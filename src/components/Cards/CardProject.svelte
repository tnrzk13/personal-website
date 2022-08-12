<script>
  export let title;
  export let text;
  export let techstack;

  // $: console.log(points);
</script>

<div class="div container-fluid">
  <div class="card m-2 cb1 text-center">
    <div class="card-body">
      <h4 class="title">{title}</h4>
      <p class="text">{text}</p>
      <div class="row">
        {#each techstack as tech}
          <div class="techstack">{tech}</div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .card {
    color: white;

    border-radius: 1rem;
    // border: 1px solid transparent;

    background-color: transparent;
  }
  .card-body {
    text-align: left;
    h4 {
      font-family: "Montserrat", sans-serif;
      font-size: 1.25rem;
      padding: 1.5rem 0 0.5rem 0;
    }
    .techstack {
      width: auto;
      background-color: #303443;
      border-radius: 1rem;
      margin: 0.25rem 0.5rem 0.25rem 0.5rem;
    }
  }
</style>
