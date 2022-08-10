<script>
  import { fade } from "svelte/transition";

  export let titleHeight;

  let y; //The window scrolling
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
      data-toggle="collapse"
      data-target="#navbarNav"
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
          class="download-container"
          href="download/Resume 2022 - Blue.pdf"
          download="TonyKwokResume"
        >
          <button class="btn btn-grad">Resume</button>
        </a>
      </ul>
    </div>
  </nav>
{/if}

<style lang="scss">
  nav {
    font-size: 1.15rem;
    font-family: "Montserrat", sans-serif;

    padding-right: 2em;
    padding-left: 2em;

    backdrop-filter: blur(10px);
    background-color: transparent;

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
      .btn-grad:hover {
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
      }
      .btn-grad:active {
        filter: brightness(50%);
      }
    }
  }
</style>
