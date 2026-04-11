<script>
  let { techstack = [] } = $props();
</script>

<span class="techstack-container">
  {#each techstack as tech, i}{#if i > 0}<span class="sep"> &middot; </span>{/if}{tech}{/each}
</span>

<style lang="scss">
  .techstack-container {
    display: block;
    margin-top: 1.25rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.6;

    .sep {
      margin: 0 0.15em;
      opacity: 0.6;
    }
  }
</style>
