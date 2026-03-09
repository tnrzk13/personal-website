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
      background-color: #303443;
      border-radius: 1rem;
      margin: 0.25rem 0;
      padding: 0 0.75rem;
      display: inline-block;
      transition: transform 0.2s ease, background-color 0.2s ease,
        box-shadow 0.2s ease;

      @media (hover: hover) {
        &:hover {
          transform: scale(1.06);
          background-color: #3a3f52;
          box-shadow: 0 0 8px rgba(100, 172, 255, 0.3);
        }
      }

      &:active {
        transform: scale(1.06);
        background-color: #3a3f52;
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
