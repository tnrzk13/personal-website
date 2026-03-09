<script>
  import GlassCard from "./GlassCard.svelte";

  let { imgurl, title, subtitle, datePeriod, points, logoColor, revealDelayMs = 0 } = $props();
</script>

<div class="compact-card reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <div class="compact-content">
      <div class="compact-header">
        <div class="compact-logo" style="background-image: {logoColor}">
          <img src={imgurl} alt="company logo" loading="lazy" />
        </div>
        <div class="compact-info">
          <h3 class="compact-title">{title}</h3>
          <p class="compact-subtitle">{subtitle}</p>
        </div>
        <span class="compact-date">{datePeriod}</span>
      </div>
      {#if points.length > 0}
        <p class="compact-bullet">
          {#each points[0] as part}
            {#if part.style === "bold"}
              <b>{part.text}</b>
            {:else}
              <span class="point-part">{part.text}</span>
            {/if}
          {/each}
        </p>
      {/if}
    </div>
  </GlassCard>
</div>

<style lang="scss">
  .compact-card {
    color: white;
  }

  .compact-content {
    padding: 1rem;
  }

  .compact-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .compact-logo {
    width: 2.5em;
    height: 2.5em;
    min-width: 2.5em;
    border-radius: 50%;
    display: grid;

    img {
      width: 2em;
      height: auto;
      align-self: center;
      justify-self: center;
    }
  }

  .compact-info {
    flex: 1;
    min-width: 0;

    h3 {
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
    }

    p {
      font-size: 0.9rem;
      color: rgb(200, 200, 200);
      margin-top: 0.1rem;
    }
  }

  .compact-date {
    font-family: "Montserrat", sans-serif;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    white-space: nowrap;
    align-self: flex-start;
  }

  .compact-bullet {
    font-size: 0.9rem;
    color: rgb(200, 200, 200);
    margin: 0.75rem 0 0 0;

    b {
      color: white;
    }
  }
</style>
