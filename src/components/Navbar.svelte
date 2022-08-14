<script>
  import { fade } from "svelte/transition";

  export let titleHeight, boolMobileView;

  let y;
  let showNavBar = false;

  $: {
    if (y > titleHeight - 1) showNavBar = true;
    else showNavBar = false;
  }
</script>

<svelte:window bind:scrollY={y} />

{#if showNavBar}
  <nav
    id="navbar"
    class="navbar navbar-expand-lg navbar-dark fixed-top"
    transition:fade
  >
    <a class="navbar-brand" href="."
      ><img src="images/navbar/gorilla.png" alt="logo gorilla" /></a
    >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <a class="nav-item nav-link" href="#aboutme">About</a>
        <a class="nav-item nav-link" href="#career">Career</a>
        <a class="nav-item nav-link" href="#projects">Projects</a>
        <a class="nav-item nav-link" href="#contact">Contact</a>
        <a
          class={boolMobileView
            ? "download-container-mobile"
            : "download-container"}
          href="download/Resume 2022 - Blue.pdf"
          download="TonyKwokResume"
        >
          <button class="btn {boolMobileView ? 'btn-grad-mobile' : 'btn-grad'}"
            >Resume</button
          >
        </a>
      </ul>
    </div>
  </nav>
{/if}

<style lang="scss">
  nav {
    font-size: 1.15rem;
    font-family: "Montserrat", sans-serif;

    padding-right: 1em;
    padding-left: 1em;

    backdrop-filter: blur(10px);
    background-color: rgba($color: white, $alpha: 0.05);

    z-index: 998;

    img {
      width: auto;
      height: 1.5em;
      opacity: 50%;
    }

    img:hover {
      opacity: 100%;
    }

    a.download-container {
      margin-left: 1em;
      margin-top: 0.1em;
      text-decoration: none;
    }

    a.download-container-mobile {
      text-decoration: none;
    }

    .btn-grad {
      background-image: linear-gradient(
        to right,
        #fc354c 0%,
        #0abfbc 51%,
        #fc354c 100%
      );
      padding-right: 2em;
      padding-left: 2em;
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      box-shadow: 0 0 20px #eee;
      border-radius: 10px;
      display: block;
    }

    .btn:hover {
      background-position: right center; /* change the direction of the change here */
      text-decoration: none;
    }

    .btn:active {
      filter: brightness(50%);
    }

    .btn-grad:hover {
      color: #fff;
    }

    .btn-grad-mobile {
      background-image: linear-gradient(
        to right,
        #fc354c 0%,
        #0abfbc 51%,
        #fc354c 100%
      );
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      box-shadow: 0 0 20px #eee;
      display: block;
    }
  }
</style>
