<script lang="ts">
  import GlassCard from "../Cards/GlassCard.svelte";
  import type { Testimonial } from "../../types";

  let { testimonial, revealDelayMs = 0 }: { testimonial: Testimonial; revealDelayMs?: number } = $props();
</script>

<div class="testimonial-card reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <div class="testimonial-content">
      <p class="quote">{testimonial.quote}</p>
      <div class="attribution">
        <span class="author">{testimonial.author}</span>
        <span class="role">{testimonial.role}, {testimonial.company}</span>
      </div>
    </div>
  </GlassCard>
</div>

<style lang="scss">
  .testimonial-content {
    padding: 1.75rem;
    position: relative;

    &::before {
      content: "\201C";
      position: absolute;
      top: 0.25rem;
      left: 1rem;
      font-size: 3rem;
      font-family: "Georgia", serif;
      line-height: 1;
      background-image: var(--gradient-title-base);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.4;
    }
  }

  .quote {
    font-style: italic;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.6;
    margin: 0.5rem 0 1.25rem 0;
    font-size: 0.95rem;
  }

  .attribution {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .author {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    color: white;
  }

  .role {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
  }
</style>
