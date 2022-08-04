<script>
  import Contact from "./05-Contact.svelte";

  export let titleHeight;

  let y;
</script>

<svelte:window bind:scrollY={y} />

{#if y > titleHeight}
  <div class="background-extension" style="bottom: {titleHeight}px;" />
  <div class="contact-wrapper">
    <Contact />
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
