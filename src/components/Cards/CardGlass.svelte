<script>
  export let title;
  export let text;
  export let techstack;
</script>

<div class="div container-fluid">
  <!-- <div class="row">
    <div class="col-md-6 d-flex justify-content-center"> -->
  <div class="card m-2 cb1 text-center">
    <div class="card-body">
      <ul>
        {#each techstack as tech}
          <li>{tech}</li>
        {/each}
      </ul>
      <p class="card-text">
        {text}
      </p>
    </div>
  </div>
  <!-- </div>
  </div> -->
</div>

<style lang="scss">
  .card {
    margin: 0 auto;
    color: black;

    border-radius: 1rem;
    border: 1px solid transparent;

    backdrop-filter: blur(1rem);
    box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

    border-top-color: rgba(225, 225, 225, 0.5);
    border-left-color: rgba(225, 225, 225, 0.5);
    border-bottom-color: rgba(225, 225, 225, 0.1);
    border-right-color: rgba(225, 225, 225, 0.1);
  }

  .cb1 {
    background-color: rgba(225, 225, 225, 0.1);
  }
</style>
