<script>
  let { open = false } = $props();
</script>

<svg class="chevron" class:open width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<style>
  .chevron {
    transition: transform 0.3s ease;
  }
  .chevron.open {
    transform: rotate(180deg);
  }
</style>
