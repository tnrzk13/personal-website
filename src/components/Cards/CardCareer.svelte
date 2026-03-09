<script>
  import Techstack from "../Misc/Techstack.svelte";
  import GlassCard from "./GlassCard.svelte";

  let { imgurl, title, subtitle, datePeriod, points, logoColor, techstack, revealDelayMs = 0 } = $props();
</script>

<div class="card-container reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <div class="career-content">
    <div class="card-header">
      <div class="circle-logo" style="background-image: {logoColor}">
        <img class="logo" src={imgurl} alt="company logo" loading="lazy" />
      </div>
      <div class="header-text">
        <h3 class="card-title">{title}</h3>
        <p class="card-subtitle">{subtitle}</p>
      </div>
      <span class="date-period">{datePeriod}</span>
    </div>
    <div class="card-body">
      <div class="techstack-wrapper">
        <Techstack {techstack} />
      </div>
      <ul class="card-text">
        {#each points as point}
          <li>
            {#each point as part}
              {#if part.style === "bold"}
                <b>{part.text}</b>
              {:else}
                <span class="point-part"> {part.text}</span>
              {/if}
            {/each}
          </li>
        {/each}
      </ul>
    </div>
    </div>
  </GlassCard>
</div>

<style lang="scss">
  .card-container {
    padding: 0;
    margin-bottom: 2.5rem;
    color: white;
    text-align: center;

    .career-content {
      padding: 1.75rem;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .header-text {
      flex: 1;
      text-align: left;
      min-width: 0;

      h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.25rem;
        line-height: 1.3;
      }
      p.card-subtitle {
        font-size: 1.05rem;
        color: rgb(200, 200, 200);
        margin-top: 0.15rem;
      }
    }

    .date-period {
      font-family: "Montserrat", sans-serif;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.5);
      white-space: nowrap;
      align-self: flex-start;
      margin-top: 0.25rem;
    }

    .card-body {
      text-align: left;
      padding: 0;

      span.point-part {
        color: white;
      }

      b {
        color: var(--bold-highlight);
      }
    }

    .card-text {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 0.4rem;

        &::before {
          content: "\2022";
          margin-right: 0.5em;
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }

    .circle-logo {
      width: 4em;
      height: 4em;
      min-width: 4em;
      border-radius: 50%;
      display: grid;

      img.logo {
        width: 3.2em;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        align-self: center;
        justify-self: center;
      }
    }

    .techstack-wrapper {
      margin-bottom: 1.25rem;
    }
  }
</style>
