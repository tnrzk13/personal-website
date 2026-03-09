<script>
  let { techstack = [] } = $props();
</script>

<span class="techstack-container">
  {#each techstack as tech}
    <span class="techstack">{tech}</span>&nbsp;
  {/each}
</span>

<style lang="scss">
  .techstack-container {
    padding: 0;

    .techstack {
      width: auto;
      font-size: 0.8rem;
      font-weight: 500;
      background-color: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      margin: 0.25rem 0;
      padding: 0.15em 0.7rem;
      display: inline-block;
      color: rgba(255, 255, 255, 0.5);
      transition: color 0.25s ease, border-color 0.25s ease;

      @media (hover: hover) {
        &:hover {
          color: rgba(255, 255, 255, 0.75);
          border-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
    .techstack:first-child {
      margin-left: 0;
    }
    .techstack:last-child {
      margin-right: 0;
    }
  }
</style>
