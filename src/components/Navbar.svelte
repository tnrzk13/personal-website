<script>
  import { slide } from "svelte/transition";
  export let boolMobileView;

  let showNavBar = false;

  let lastScrollTop;
  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) showNavBar = false;
    else showNavBar = true;
    lastScrollTop = scrollTop;
  });
</script>

{#if showNavBar}
  <nav
    id="navbar"
    class="navbar navbar-expand-md navbar-dark fixed-top 
      {boolMobileView ? 'nav-mobile-background' : ''}"
    transition:slide
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
          href="download/Resume.pdf"
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
  .nav-mobile-background {
    background-image: linear-gradient(
      109.6deg,
      rgba(62, 161, 219, 1) 11.2%,
      rgba(93, 52, 236, 1) 100.2%
    );
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
