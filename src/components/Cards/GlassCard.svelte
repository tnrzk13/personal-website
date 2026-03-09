<div class="glass-card">
  {@render children()}
</div>

<script>
  let { children } = $props();
</script>

<style>
  .glass-card {
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: border-color 0.3s ease, background 0.3s ease, scale 0.3s ease;
  }

  @media (hover: hover) {
    .glass-card:hover {
      border-color: rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.05);
      scale: 1.02;
    }
  }
</style>
