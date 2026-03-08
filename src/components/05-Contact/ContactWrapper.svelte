<script>
  import ContactMobile from "./ContactMobile.svelte";

  let { contactInfo } = $props();
</script>

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
