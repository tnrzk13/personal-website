<script>
  window.onload = getForegroundStart;
  window.onresize = getForegroundStart;
  let foregroundTop;
  function getForegroundStart() {
    foregroundTop = window.screen.availWidth * 0.5625;
  }
</script>

<div class="aboutMe" style="top: {foregroundTop}px;">
  <div class="text">
    Hello! I'm Tony and I like creating things using data. My interest began
    during my first co-op term as an accountant, when I needed to manipulate
    data in Excel. It went from keyboard shortcuts to VBA to quickly
    transferring out of my accounting program!
    <br /><br />
    What’s happened since then? I’ve had the privilege of working as a Full Stack
    Developer, a Data Specialist, and even an Innovation Catalyst! I recently enjoyed
    my relaxing post-graduation break and now I’m looking for a company to join for
    my next adventure.
    <br /> <br />
    Here are a few technologies I’ve been working with: - Python - JavaScript - Svelte
    - SQL - Node JS
  </div>
</div>

<style lang="scss">
  .aboutMe {
    position: absolute;
    width: 100%;
    height: 900px;
    /* background-color: black; */
    background-image: linear-gradient(rgb(6, 0, 87), purple, gold);
    color: white;
    /* border-radius: 0 0 1.5em 1.5em; */

    .text {
    }
  }
</style>
