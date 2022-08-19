<script>
  import IntersectionObserver from "svelte-intersection-observer";
  import { fade } from "svelte/transition";

  export let boolFadeAnimation = true;
  let node;
</script>

{#if boolFadeAnimation}
  <IntersectionObserver once element={node} let:intersecting>
    <span bind:this={node}>
      {#if intersecting}
        <span class="fade-in" transition:fade={{ delay: 200 }}>
          <slot />
        </span>
      {/if}
    </span>
  </IntersectionObserver>
{/if}
