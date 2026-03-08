<script>
  import { getImagePath } from "../utils/imagePath";

  let { boolMobileView, scrollY = 0 } = $props();

  let showNavBar = $state(true);
  let navOpen = $state(false);
  let lastScrollTop = 0;
  let activeSection = $state("");
  let aboutSectionTop = $state(0);

  const SCROLL_HIDE_THRESHOLD = 50;
  const sectionIds = ["aboutme", "career", "projects", "contact"];

  $effect(() => {
    const aboutEl = document.getElementById("aboutme");
    if (aboutEl) aboutSectionTop = aboutEl.getBoundingClientRect().top + window.scrollY;
  });

  $effect(() => {
    if (scrollY > lastScrollTop && scrollY > SCROLL_HIDE_THRESHOLD) showNavBar = false;
    else showNavBar = true;
    lastScrollTop = scrollY;
  });

  $effect(() => {
    const observers = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) activeSection = id;
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  });

  let navbarHeight = 48;
  let isScrolled = $derived(aboutSectionTop > 0 && scrollY >= aboutSectionTop - navbarHeight);
</script>

<header class:nav-hidden={boolMobileView && !showNavBar}>
  <nav
    id="navbar"
    class:scrolled={isScrolled}
  >
    <a class="nav-brand" href=".">
      <img
        src={getImagePath("images/navbar/gorilla")}
        alt="logo gorilla"
      />
    </a>
    <button
      class="nav-toggle"
      class:open={navOpen}
      type="button"
      onclick={() => navOpen = !navOpen}
      aria-expanded={navOpen}
      aria-label="Toggle navigation"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    <div class="nav-links" class:open={navOpen}>
      <ul>
        <li>
          <a class="nav-link" class:active={activeSection === "aboutme"} href="#aboutme" onclick={() => navOpen = false}>About</a>
        </li>
        <li>
          <a class="nav-link" class:active={activeSection === "career"} href="#career" onclick={() => navOpen = false}>Career</a>
        </li>
        <li>
          <a class="nav-link" class:active={activeSection === "projects"} href="#projects" onclick={() => navOpen = false}>Projects</a>
        </li>
        <li>
          <a class="nav-link" class:active={activeSection === "contact"} href="#contact" onclick={() => navOpen = false}>Contact</a>
        </li>
        <li>
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
        </li>
      </ul>
    </div>
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
    transform: translateY(0);
    transition: transform 0.35s ease;

    &.nav-hidden {
      transform: translateY(-100%);
    }
  }

  nav {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 1.15rem;
    font-family: "Montserrat", sans-serif;
    padding: 0.6em 1.5em;
    transition: background-color 0.35s ease, backdrop-filter 0.35s ease;

    &.scrolled {
      background-color: rgba(4, 13, 33, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    img {
      width: auto;
      height: 1.5em;
      transition: transform 0.3s ease;
    }

    img:hover {
      transform: scale(1.1);
    }

    a.nav-link {
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
      font-weight: 500;
      position: relative;
      padding-bottom: 0.15em;
      transition: color 0.3s ease;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        background: var(--gradient-button-red-blue);
        background-size: 200% auto;
        transition: width 0.3s ease;
      }

      &:hover {
        color: white;

        &::after {
          width: 100%;
        }
      }

      &.active {
        color: white;

        &::after {
          width: 100%;
        }
      }
    }

    a.resume-btn-desktop {
      margin-left: 0.5em;
      text-decoration: none;
    }

    a.resume-btn-mobile {
      text-decoration: none;
    }

    .resume-btn-desktop {
      background-image: var(--gradient-button-red-blue);
      padding: 0.3em 2em;
      text-align: center;
      text-transform: uppercase;
      transition: background-position 0.4s ease, transform 0.3s ease;
      background-size: 200% auto;
      color: white;
      border-radius: 20px;
      display: block;
    }

    .resume-btn:hover {
      background-position: right center;
      text-decoration: none;
      transform: scale(1.05);
    }

    .resume-btn:active {
      filter: brightness(80%);
    }

    .resume-btn-desktop:hover {
      color: #fff;
    }

    .resume-btn-mobile {
      background-image: var(--gradient-button-red-blue);
      padding: 0.3em 2em;
      text-align: center;
      text-transform: uppercase;
      transition: background-position 0.4s ease, transform 0.3s ease;
      background-size: 200% auto;
      color: white;
      border-radius: 20px;
      display: block;
    }
  }

  /* Hamburger button */
  .nav-toggle {
    display: none;
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5em;
    width: 36px;
    height: 36px;
    position: relative;

    .hamburger-line {
      display: block;
      width: 22px;
      height: 2px;
      background: white;
      border-radius: 2px;
      position: absolute;
      left: 7px;
      transition: transform 0.3s ease, opacity 0.3s ease;

      &:nth-child(1) {
        top: 9px;
      }
      &:nth-child(2) {
        top: 17px;
      }
      &:nth-child(3) {
        top: 25px;
      }
    }

    &.open {
      .hamburger-line:nth-child(1) {
        top: 17px;
        transform: rotate(45deg);
      }
      .hamburger-line:nth-child(2) {
        opacity: 0;
      }
      .hamburger-line:nth-child(3) {
        top: 17px;
        transform: rotate(-45deg);
      }
    }
  }

  .nav-links {
    display: flex;
    align-items: center;
    margin-left: auto;

    ul {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  @media (max-width: 767px) {
    .nav-toggle {
      display: block;
    }

    nav.scrolled,
    nav {
      background-color: rgba(4, 13, 33, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
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
        gap: 0.75rem;
      }

      &.open {
        display: flex;
        max-height: 20rem;
        opacity: 1;
      }
    }
  }
</style>
