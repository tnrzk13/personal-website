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
    display: block;
    padding: 0;
    margin-top: 1.25rem;

    .techstack {
      width: auto;
      font-size: 0.85rem;
      font-weight: 500;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 999px;
      margin: 0.25rem 0;
      padding: 0.2em 0.85rem;
      display: inline-block;
      color: rgba(255, 255, 255, 0.6);
      transition: color 0.25s ease, border-color 0.25s ease;

      @media (hover: hover) {
        &:hover {
          color: white;
          border-color: rgba(255, 255, 255, 0.35);
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
