<script>
  import Techstack from "../Misc/Techstack.svelte";

  let { imgurl, title, subtitle, points, logoColor, techstack, revealDelayMs = 0 } = $props();
</script>

<div class="container-fluid card-container reveal" style="transition-delay: {revealDelayMs}ms">
  <div class="card m-2 cb1 text-center">
    <div class="card-body">
      <div class="circle-logo" style="background-image: {logoColor}">
        <img class="logo" src={imgurl} alt="company logo" />
      </div>
      <h3 class="card-title">{title}</h3>
      <p class="card-subtitle">{subtitle}</p>
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
</div>

<style lang="scss">
  .card-container {
    padding: 0;
    margin-bottom: 2.5rem;

    .card {
      color: white;
      border-radius: 1rem;
      border: none;
      background-color: transparent;
    }
    .card-body {
      text-align: left;
      padding: 0;
      h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.25rem;
        padding: 1.5rem 0 0.5rem 0;
      }
      p.card-subtitle {
        font-size: 1.15rem;
        padding-bottom: 0.5rem;
        color: rgb(200, 200, 200);
      }

      span.point-part {
        color: rgb(200, 200, 200);
      }
    }
    .circle-logo {
      width: 5em;
      height: 5em;
      border-radius: 50%;
      display: grid;
      img.logo {
        width: 4em;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        align-self: center;
        justify-self: center;
      }
    }

    .techstack-wrapper {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
</style>
