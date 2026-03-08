<script lang="ts">
  import { reveal } from "../actions/reveal";

  let { text, tag = "h2", class: className = "" } = $props();

  const words = text.split(" ");
  const STAGGER_MS = 80;
</script>

<svelte:element this={tag} class="{className} text-reveal" use:reveal={{ propagateTo: '[data-reveal-section]', propagateDelayMs: (words.length - 1) * STAGGER_MS }}>
  {#each words as word, i}
    <span class="word" style="transition-delay: {i * STAGGER_MS}ms">{word}</span>
  {/each}
</svelte:element>

<style>
  .text-reveal {
    overflow: hidden;
  }

  .text-reveal .word {
    display: inline-block;
    opacity: 0;
    transform: translateY(0.6em);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    margin-right: 0.2em;
  }

  :global(.revealed) .text-reveal .word,
  .text-reveal:global(.revealed) .word {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .text-reveal .word {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
