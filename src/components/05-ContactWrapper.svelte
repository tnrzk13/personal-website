<script>
  import Contact from "./05-Contact.svelte";

  export let contactHeight, containerHeight;
  export let contactYOffset = 100;
  export let pageHalfDown = 1000;

  let y;
</script>

<svelte:window bind:scrollY={y} />

{#if y > Math.max(0, pageHalfDown)}
  <div class="background-extension" style="bottom: {contactHeight}px;" />
  <div
    class="contact-wrapper"
    style="transform: translateY({contactYOffset}px);"
  >
    <Contact {containerHeight} {contactYOffset} />
  </div>
{/if}

<style lang="scss">
  .background-extension {
    position: fixed;
    width: 100%;
    height: 15vh;
    z-index: 0;
    background-color: #94b5f7;
  }

  .contact-wrapper {
    background-color: white;
    position: fixed;
    bottom: 0;
    z-index: 0;
    width: 100%;
  }
</style>
