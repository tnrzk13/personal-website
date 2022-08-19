<script>
  let techs1 = ["Python", "Javascript", "Svelte"];
  let techs2 = ["SQL", "Node.JS"];
</script>

<div id="aboutme" class="aboutMe container-fluid col-sm-10 offset-sm-1">
  <div class="empty row" />
  <h1 class="title col-md-9">A little about me</h1>
  <div class="row col-md-9">
    <div class="text col-md-7">
      <div class="description">
        My interest began during my first co-op term as an accountant, when I
        needed to manipulate data in Excel. It went from keyboard shortcuts to
        VBA to quickly transferring out of my accounting program!
        <br /><br />
        Since then, I've worked as a Full Stack Developer, a Data Specialist, and
        even an Innovation Catalyst! I recently enjoyed my post-graduation break
        and now I’m looking for a company to join for my next adventure.
        <br /> <br />
        Here are a few technologies I’ve been working with:
        <br /><br />
      </div>
      <div class="row techlist1 m-0 p-0">
        <div class="row">
          {#each techs1 as tech}
            <div class="techstack">{tech}</div>
          {/each}
          {#each techs2 as tech}
            <div class="techstack">{tech}</div>
          {/each}
        </div>
      </div>
    </div>
    <div class="imgdiv col-md-5">
      <div class="aboutmeimg-container">
        <img
          class="aboutmeimg"
          src="images/02-aboutme/self.avif"
          alt="tony kwok"
        />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @media (max-width: 767px) {
    .imgdiv {
      padding-top: 2em;
    }
  }
  .aboutMe {
    height: auto;
    color: white;

    .techlist1 .row {
      padding: 0;
    }

    .imgdiv {
      position: relative;
      box-sizing: border-box;
      display: grid;
      .aboutmeimg-container {
        justify-self: center;
        align-self: center;
        img.aboutmeimg {
          max-width: 15em;
          height: auto;
          border-radius: 50%;
        }
      }
    }

    .empty {
      height: 20em;
    }

    h1.title {
      margin: 0 auto 0.5em auto;
      background-image: var(--gradient-pink-blue);
    }
    .row {
      margin: 0 auto;
    }
    .text {
      box-sizing: border-box;
      font-family: "Open Sans", sans-serif;
      font-size: 1em;

      .techstack {
        width: auto;
        background-color: #303443;
        border-radius: 1rem;
        margin: 0.25rem 0.5rem 0.25rem 0;
      }
    }
    .description {
      box-sizing: border-box;
    }
  }
</style>
