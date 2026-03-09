<script>
  let { title, urls, text, techstack } = $props();
  import Techstack from "../Misc/Techstack.svelte";
</script>

<div class="project-card-wrapper">
  <div class="project-card">
    <div class="card-body">
      {#if urls.projectUrl || urls.codeUrl}
        <span class="title-row">
          {#if urls.projectUrl}
            <a href={urls.projectUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} project">
              <h3 class="title">
                {title}
                <i class="fa-solid fa-link" aria-hidden="true"></i>
              </h3>
            </a>
          {:else}
            <a href={urls.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} source code">
              <h3 class="title">
                {title}
              </h3>
            </a>
          {/if}
          {#if urls.codeUrl}
            <a href={urls.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} source code on GitHub" class="github-link">
              <span class="title">
                <i class="fa-brands fa-github" aria-hidden="true"></i>
              </span>
            </a>
          {/if}
        </span>
      {:else}
        <h3 class="title">{title}</h3>
      {/if}
      <p class="text">{@html text}</p>
      <Techstack {techstack} />
    </div>
  </div>
</div>

<style lang="scss">
  .project-card-wrapper {
    padding: 0;

    .project-card {
      color: white;
      border-radius: 1rem;
      background-color: transparent;
      border: none;
      margin: 0.5rem;
      text-align: center;
    }

    .card-body {
      text-align: left;
      padding: 1em 1em;

      a {
        text-decoration: none;
        color: #64acff;
      }
      a:hover {
        filter: brightness(75%);
      }

      h3, span.title {
        font-family: "Montserrat", sans-serif;
        font-size: 1.5rem;
        padding: 1.5rem 0 0.5rem 0;
        display: inline;
      }

      .text {
        margin-top: 1.5em;

        :global(strong) {
          color: var(--bold-highlight);
          font-weight: 600;
        }
      }

      .title-row {
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
      }
    }
  }
</style>
