<script>
  import Contact from "./ContactDesktop.svelte";
  import ContactMobile from "./ContactMobile.svelte";

  export let contactHeight, containerHeight, contactInfo, boolMobileView;
  export let contactYOffset = 100;
  export let pageHalfDown = 1000;

  let y;
</script>

<svelte:window bind:scrollY={y} />

{#if y > Math.max(0, pageHalfDown)}
  {#if boolMobileView}
    <div id="contact-wrapper">
      <ContactMobile {contactInfo} />
    </div>
  {:else}
    <div class="background-extension" style="bottom: {contactHeight}px;" />
    <div
      id="contact-wrapper"
      style="transform: translateY({contactYOffset}px);"
    >
      <Contact {containerHeight} {contactYOffset} {contactInfo} />
    </div>
  {/if}
{/if}

<style lang="scss">
  .background-extension {
    position: fixed;
    width: 100%;
    height: 15vh;
    z-index: 0;
    background-color: #94b5f7;
  }

  #contact-wrapper {
    position: fixed;
    bottom: 0;
    z-index: 0;
    width: 100%;
  }
</style>
