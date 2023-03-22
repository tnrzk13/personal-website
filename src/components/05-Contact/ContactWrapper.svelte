<script>
  import ContactMobile from "./ContactMobile.svelte";

  export let contactInfo;

  let y;
</script>

<svelte:window bind:scrollY={y} />

<div id="contact-wrapper">
  <ContactMobile {contactInfo} />
</div>

<style lang="scss">
  #contact-wrapper {
    // position: fixed;
    // bottom: 0;
    // z-index: -1;
    // width: 100%;
  }
</style>
