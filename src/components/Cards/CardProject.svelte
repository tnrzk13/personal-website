<script>
  export let title, urls, text, techstack;
  import Techstack from "../Misc/Techstack.svelte";
</script>

<div class="div container-fluid">
  <div class="card border-0 m-2 cb1 text-center">
    <div class="card-body">
      {#if urls.boolUrlExists}
        <span>
          <a href={urls.projectUrl}>
            <h4 class="title">
              {title} <i class="fa-solid fa-link" />
            </h4>
          </a>
          &nbsp; &nbsp;
          {#if urls.codeUrl !== ""}
            <a href={urls.codeUrl}>
              <h4 class="title">
                <i class="fa-brands fa-github" />
              </h4>
            </a>
          {/if}
        </span>
      {:else}
        <h4 class="title">{title}</h4>
      {/if}
      <br /><br />
      <p class="text">{text}</p>
      <div class="row">
        <Techstack {techstack} />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .container-fluid {
    padding: 0;

    .card {
      color: white;
      border-radius: 1rem;
      background-color: transparent;
    }

    .card-body {
      text-align: left;
      padding: 1em 1em;

      a {
        text-decoration: none;
        color: white;
      }
      a:hover {
        filter: brightness(50%);
      }

      h4 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.5rem;
        padding: 1.5rem 0 0.5rem 0;
        display: inline;
      }
    }
  }
</style>
