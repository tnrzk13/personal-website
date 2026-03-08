<script>
  import Techstack from "../Misc/Techstack.svelte";

  let { imgurl, title, subtitle, points, logoColor, techstack } = $props();
</script>

<div class="container-fluid card-container">
  <div class="card m-2 cb1 text-center">
    <div class="card-body">
      <div class="circle-logo" style="background-image: {logoColor}">
        <img class="logo" src={imgurl} alt="company logo" />
      </div>
      <h4 class="card-title">{title}</h4>
      <h6 class="card-subtitle">{subtitle}</h6>
      <div class="techstack-wrapper">
        <Techstack {techstack} />
      </div>
      <p class="card-text">
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
      </p>
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
      h4 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.25rem;
        padding: 1.5rem 0 0.5rem 0;
      }
      h6 {
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
