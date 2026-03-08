<script>
  import { slide } from "svelte/transition";
  import { getImagePath } from "../utils/imagePath";

  let { boolMobileView, scrollY = 0 } = $props();

  let showNavBar = $state(false);
  let navOpen = $state(false);
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
    class:nav-mobile-background={boolMobileView}
    transition:slide
  >
    <a class="nav-brand" href=".">
      <img
        src={getImagePath("images/navbar/gorilla")}
        alt="logo gorilla"
      />
    </a>
    <button
      class="nav-toggle"
      type="button"
      onclick={() => navOpen = !navOpen}
      aria-expanded={navOpen}
      aria-label="Toggle navigation"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="3" y1="6" x2="21" y2="6" stroke="white" stroke-width="2" stroke-linecap="round" />
        <line x1="3" y1="12" x2="21" y2="12" stroke="white" stroke-width="2" stroke-linecap="round" />
        <line x1="3" y1="18" x2="21" y2="18" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <div class="nav-links" class:open={navOpen}>
      <ul>
        <a class="nav-link" href="#aboutme" onclick={() => navOpen = false}>About</a>
        <a class="nav-link" href="#career" onclick={() => navOpen = false}>Career</a>
        <a class="nav-link" href="#projects" onclick={() => navOpen = false}>Projects</a>
        <a class="nav-link" href="#contact" onclick={() => navOpen = false}>Contact</a>
        <a
          class="resume-btn {boolMobileView
            ? 'resume-btn-mobile'
            : 'resume-btn-desktop'}"
          href="download/Resume.pdf"
          download="TonyKwokResume"
          onclick={() => navOpen = false}
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 1.15rem;
    font-family: "Montserrat", sans-serif;
    padding-right: 1em;
    padding-left: 1em;
    z-index: 998;

    img {
      width: auto;
      height: 1.5em;
      transition: 0.5s;
    }

    img:hover {
      scale: 110%;
    }

    a.nav-link {
      color: white;
      transition: 0.5s;
    }

    a.nav-link:hover {
      scale: 110%;
    }

    a.resume-btn-desktop {
      margin-left: 1em;
      margin-top: 0.1em;
      text-decoration: none;
    }

    a.resume-btn-mobile {
      text-decoration: none;
    }

    .resume-btn-desktop {
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

    .resume-btn:hover {
      background-position: right center;
      text-decoration: none;
      scale: 110%;
    }

    .resume-btn:active {
      filter: brightness(50%);
    }

    .resume-btn-desktop:hover {
      color: #fff;
    }

    .resume-btn-mobile {
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

  .nav-toggle {
    display: none;
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25em;
  }

  .nav-links {
    display: flex;
    align-items: center;
    margin-left: auto;

    ul {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  @media (max-width: 767px) {
    .nav-toggle {
      display: block;
    }

    .nav-links {
      display: none;
      flex-basis: 100%;
      flex-direction: column;
      padding: 0.5rem 0;
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.3s ease, opacity 0.3s ease;
      opacity: 0;

      ul {
        flex-direction: column;
        width: 100%;
      }

      &.open {
        display: flex;
        max-height: 20rem;
        opacity: 1;
      }
    }
  }
</style>
