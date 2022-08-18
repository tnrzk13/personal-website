<script>
  import ContactMobile from "./ContactMobile.svelte";

  export let contactHeight, containerHeight, contactInfo, boolMobileView;
  export let contactYOffset = 100;
  export let pageHalfDown = 1000;

  let y;
</script>

<svelte:window bind:scrollY={y} />

{#if y > Math.max(0, pageHalfDown)}
  <div id="contact-wrapper">
    <ContactMobile {contactInfo} />
  </div>
{/if}

<style lang="scss">
  #contact-wrapper {
    position: fixed;
    bottom: 0;
    z-index: 0;
    width: 100%;
  }
</style>
