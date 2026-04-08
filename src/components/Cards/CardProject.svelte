<script>
  let { title, urls, text, techstack, expanded = false } = $props();
  import Techstack from "../Misc/Techstack.svelte";
  import IconLink from "../Icons/IconLink.svelte";
  import IconGitHub from "../Icons/IconGitHub.svelte";
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
                <IconLink />
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
                <IconGitHub />
              </span>
            </a>
          {/if}
        </span>
      {:else}
        <h3 class="title">{title}</h3>
      {/if}
      <p class="text">{@html text}</p>
      <Techstack {techstack} />
      <div class="extra-content" class:open={expanded}>
        <div class="extra-inner"></div>
      </div>
    </div>
  </div>
  <div class="chevron-row">
    <svg class="chevron" class:open={expanded} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
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
        width: 0.8em;
        height: 0.8em;
        vertical-align: -0.125em;
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

    .extra-content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.35s ease;
      &.open { grid-template-rows: 1fr; }
    }

    .extra-inner {
      overflow: hidden;
      padding: 0 1em;
    }

    .chevron-row {
      display: flex;
      justify-content: center;
      padding: 0.25rem 0 0.5rem;
    }

    .chevron {
      color: rgba(255, 255, 255, 0.25);
      transition: transform 0.3s ease;
      &.open { transform: rotate(180deg); }
    }
  }
</style>
