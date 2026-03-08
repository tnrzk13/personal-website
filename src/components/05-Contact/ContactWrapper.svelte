<script>
  import ContactMobile from "./ContactMobile.svelte";

  let { contactInfo } = $props();
</script>

<div id="contact-wrapper">
  <ContactMobile {contactInfo} />
</div>

<style lang="scss">
  #contact-wrapper {
  }
</style>
