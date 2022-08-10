<script>
  import Saos from "saos";

  export let boolFadeAnimation;
</script>

{#if boolFadeAnimation}
  <Saos
    animation={"fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both"}
    animation_out={"slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"}
    top={250}
    bottom={250}
  >
    <slot />
  </Saos>
{:else}
  <slot />
{/if}
