<script>
  // window.onload = getForegroundStart;
  // window.onresize = getForegroundStart;
  // let foregroundTop;
  // function getForegroundStart() {
  //   foregroundTop = window.screen.availWidth * 0.5625;
  // }

  let techs1 = ["Python", "Javascript", "Svelte"];
  let techs2 = ["SQL", "Node.JS"];
</script>

<!-- <div class="aboutMe" style="top: {foregroundTop}px;"> -->
<div class="aboutMe">
  <div class="title col-md-9 ">About Me <br /><br /></div>
  <div class="row col-md-9">
    <div class="text col-md-7">
      <div class="description">
        Hi! I'm Tony and I like creating things using data. My interest began
        during my first co-op term as an accountant, when I needed to manipulate
        data in Excel. It went from keyboard shortcuts to VBA to quickly
        transferring out of my accounting program!
        <br /><br />
        What’s happened since then? I’ve had the privilege of working as a Full Stack
        Developer, a Data Specialist, and even an Innovation Catalyst! I recently
        enjoyed my relaxing post-graduation break and now I’m looking for a company
        to join for my next adventure.
        <br /> <br />
        Here are a few technologies I’ve been working with:
        <br /><br />
      </div>
      <div class="row techlist1">
        <ul class="list-unstyled col-md-6">
          {#each techs1 as tech, index}
            <li>{tech}</li>
          {/each}
        </ul>
        <ul class="list-unstyled col-md-6">
          {#each techs2 as tech, index}
            <li>{tech}</li>
          {/each}
        </ul>
      </div>
    </div>
    <div class="imgdiv col-md-5">
      <img class="aboutmeimg" src="images/aboutme/self2.png" alt="tony kwok" />
    </div>
  </div>
</div>

<style lang="scss">
  .aboutMe {
    width: 100%;
    height: auto;
    color: white;
    padding: 0;
    margin: 0;

    .title {
      margin: 0 auto;
      padding: 0;
      font-family: "Montserrat", sans-serif;
      font-size: 2em;
    }
    .row {
      margin: 0 auto;
    }
    .text {
      box-sizing: border-box;
      // margin: 0 auto;
      // padding: 0;
      font-family: "Open Sans", sans-serif;
      font-size: 1em;
    }
    .description {
      box-sizing: border-box;
    }
    .imgdiv {
      // margin: 0 auto;
      box-sizing: border-box;
    }
    .aboutmeimg {
      background: transparent;
      max-width: 15em;
      height: auto;
    }
  }
</style>
