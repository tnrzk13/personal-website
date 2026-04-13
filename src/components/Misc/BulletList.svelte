<script lang="ts">
  import type { TextPart } from "../../types";

  let { points }: { points: TextPart[][] } = $props();
</script>

<ul class="bullet-list">
  {#each points as point}
    <li>
      {#each point as part}
        {#if part.style === "bold"}
          <b>{part.text}</b>
        {:else}
          <span class="point-part">{part.text}</span>
        {/if}
      {/each}
    </li>
  {/each}
</ul>

<style lang="scss">
  .bullet-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.6rem;

      &::before {
        content: "\2022";
        margin-right: 0.5em;
        color: rgba(255, 255, 255, 0.4);
      }
    }

    b {
      color: var(--bold-highlight);
    }

    .point-part {
      color: white;
    }
  }
</style>
