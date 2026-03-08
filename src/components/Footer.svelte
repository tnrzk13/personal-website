<script>
  const LINKEDIN_URL = "https://www.linkedin.com/in/tony-k-kwok/";
  const GITHUB_URL = "https://github.com/tnrzk13";
  const EMAIL = "thisistonykwok@gmail.com";
</script>

<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-links">
      <a href={LINKEDIN_URL} aria-label="LinkedIn profile" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
        <span>LinkedIn</span>
      </a>
      <a href={GITHUB_URL} aria-label="GitHub profile" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
        <span>GitHub</span>
      </a>
      <a href="mailto:{EMAIL}">
        <i class="fa-solid fa-envelope" aria-hidden="true"></i>
        <span>Email</span>
      </a>
    </div>
    <p class="footer-copyright">&copy; 2025 Tony Kwok</p>
  </div>
</footer>

<style lang="scss">
  .site-footer {
    background-color: var(--darkblue);
    color: rgba(255, 255, 255, 0.6);
    font-family: "Montserrat", sans-serif;
    padding: 2rem 1rem;
    text-align: center;
  }

  .footer-content {
    max-width: 600px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .footer-links {
    display: flex;
    gap: 2rem;

    a {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.3s ease;

      &:hover {
        color: white;
      }

      i {
        font-size: 1.1rem;
      }
    }
  }

  .footer-copyright {
    font-size: 0.8rem;
    margin: 0;
  }

  @media (max-width: 767px) {
    .footer-links {
      gap: 1.5rem;

      a span {
        // Hide text labels on mobile, show only icons
        display: none;
      }

      a i {
        font-size: 1.3rem;
      }
    }
  }
</style>
