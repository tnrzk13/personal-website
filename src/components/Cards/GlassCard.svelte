<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="glass-card"
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
  bind:this={cardEl}
>
  {@render children()}
</div>

<script>
  const MAX_TILT_DEG = 2;

  let { children } = $props();
  let cardEl = $state(null);

  const canTilt = typeof window !== "undefined"
    && window.matchMedia("(pointer: fine)").matches
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handleMouseMove(e) {
    if (!canTilt || !cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = -y * MAX_TILT_DEG;
    const rotateY = x * MAX_TILT_DEG;
    cardEl.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  function handleMouseLeave() {
    if (!cardEl) return;
    cardEl.style.transform = "";
  }
</script>

<style>
  .glass-card {
    height: 100%;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    will-change: transform;
    transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
  }

  @media (hover: hover) {
    .glass-card:hover {
      border-color: rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.05);
    }
  }
</style>
