<script>
  export let title, url, text, techstack;
</script>

<div class="div container-fluid">
  <div class="card m-2 cb1 text-center">
    <div class="card-body">
      {#if url === ""}
        <h4 class="title">{title}</h4>
      {:else}
        <a href={url}>
          <h4 class="title">{title}</h4>
        </a>
      {/if}
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

    a {
      text-decoration: none;
      color: white;

      h4 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.25rem;
        padding: 1.5rem 0 0.5rem 0;
      }
    }

    a:hover {
      filter: brightness(50%);
    }

    .techstack {
      width: auto;
      background-color: #303443;
      border-radius: 1rem;
      margin: 0.25rem 0.5rem 0.25rem 0.5rem;
    }
  }
</style>
