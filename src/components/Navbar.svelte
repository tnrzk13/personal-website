<script>
  import { slide } from "svelte/transition";
  import { getImagePath } from "../utils/imagePath";

  let { boolMobileView, scrollY = 0 } = $props();

  let showNavBar = $state(false);
  let lastScrollTop = 0;

  $effect(() => {
    if (scrollY > lastScrollTop) showNavBar = false;
    else showNavBar = true;
    lastScrollTop = scrollY;
  });
</script>

{#if !boolMobileView || showNavBar}
  <header>
  <nav
    id="navbar"
    class="navbar navbar-expand-md navbar-dark fixed-top
      {boolMobileView ? 'nav-mobile-background' : ''}"
    transition:slide
  >
    <a class="navbar-brand" href=".">
      <img
        src={getImagePath("images/navbar/gorilla")}
        alt="logo gorilla"
      />
    </a>
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
          class="btn {boolMobileView
            ? 'download-container-mobile btn-grad-mobile'
            : 'download-container btn-grad'}"
          href="download/Resume.pdf"
          download="TonyKwokResume"
        >
          Resume
        </a>
      </ul>
    </div>
  </nav>
  </header>
{/if}

<style lang="scss">
  .nav-mobile-background {
    background-color: var(--darkblue);
    border-bottom: 3px solid white;
  }

  nav {
    font-size: 1.15rem;
    font-family: "Montserrat", sans-serif;
    padding-right: 1em;
    padding-left: 1em;
    z-index: 998;

    img {
      width: auto;
      height: 1.5em;
    }

    img:hover {
      scale: 110%;
      transition: 0.5s;
    }

    a.nav-item {
      color: white;
    }
    a.nav-item:hover {
      scale: 110%;
      transition: 0.5s;
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
      background-image: var(--gradient-button-red-blue);
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
      background-position: right center;
      text-decoration: none;
      scale: 110%;
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
