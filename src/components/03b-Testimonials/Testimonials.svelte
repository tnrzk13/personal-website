<script>
  import { testimonials } from "../../data/testimonials";
  import TestimonialCard from "./TestimonialCard.svelte";
  import TextReveal from "../TextReveal.svelte";

</script>

<div id="testimonials" class="section-inset" data-reveal-section>
  <TextReveal text="What others say" class="section-title content-width" />
  <div class="testimonial-grid content-width">
    {#each testimonials as testimonial, i}
      <TestimonialCard {testimonial} revealDelayMs={50 + i * 60} />
    {/each}
  </div>
</div>

<style lang="scss">
  :global(h2.section-title) {
    background-image: var(--gradient-bora-bora);
  }

  #testimonials {
    border: 1px solid transparent;
  }

  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 0;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }
</style>
