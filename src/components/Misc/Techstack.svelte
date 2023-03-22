<script>
  export let techstack = [];
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
    }
    .techstack:first-child {
      margin-left: 0;
    }
    .techstack:last-child {
      margin-right: 0;
    }
  }
</style>
