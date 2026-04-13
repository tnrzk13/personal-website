<script>
  let { techstack = [] } = $props();
</script>

<span class="techstack-container">
  {#each techstack as tech, i}{#if i > 0}{" · "}{/if}{tech}{/each}
</span>

<style lang="scss">
  .techstack-container {
    display: block;
    margin-top: 1.25rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
  }
</style>
