<script>
  import Techstack from "../Misc/Techstack.svelte";

  import IconGitHub from "../Icons/IconGitHub.svelte";
  import ChevronIcon from "../Icons/ChevronIcon.svelte";

  let { title, urls, text, details = [], techstack, expanded = false } = $props();
</script>

<div class="project-card-wrapper">
  <div class="project-card">
    <div class="card-body">
      <div class="title-row">
        {#if urls.projectUrl}
          <a href={urls.projectUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} project">
            <h3 class="title">{title}</h3></a>
        {:else if urls.codeUrl}
          <a href={urls.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} source code">
            <h3 class="title">{title}</h3></a>
        {:else}
          <h3 class="title">{title}</h3>
        {/if} {#if urls.codeUrl}<a href={urls.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} source code on GitHub" class="github-link">
            <IconGitHub />
          </a>
        {/if}
      </div>
      <p class="text">{@html text}</p>
      <Techstack {techstack} />
      <div class="extra-content" class:open={expanded}>
        <div class="extra-inner">
          {#if details.length > 0}
            <ul class="details-list">
              {#each details as detail}
                <li>{@html detail}</li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="chevron-row">
    <ChevronIcon open={expanded} />
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

      :global(svg) {
        width: 1.2em;
        height: 1.2em;
        vertical-align: -0.2em;
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
      }
    }

    .extra-content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.35s ease;
      &.open { grid-template-rows: 1fr; }
    }

    .extra-inner {
      overflow: hidden;

      .details-list {
        margin: 1em 0 0.5em;
        padding: 0;
        list-style: none;

        li {
          margin-bottom: 0.5em;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);

          &::before {
            content: "\2022";
            margin-right: 0.5em;
            color: rgba(255, 255, 255, 0.4);
          }

          :global(strong) {
            color: var(--bold-highlight);
            font-weight: 600;
          }
        }
      }
    }

    .chevron-row {
      display: flex;
      justify-content: center;
      padding: 0.25rem 0 0.5rem;
    }

    :global(.chevron) {
      color: rgba(255, 255, 255, 0.25);
    }
  }
</style>
