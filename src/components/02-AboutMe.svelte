<script>
  let techs1 = ["Python", "Javascript", "Svelte"];
  let techs2 = ["SQL", "Node.JS"];
</script>

<!-- <div class="aboutMe" style="top: {foregroundTop}px;"> -->
<div id="aboutme" class="aboutMe container-fluid">
  <div class="empty row" />
  <h1 class="title col-md-9">About me</h1>
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
          src="images/02-aboutme/self2.png"
          alt="tony kwok"
        />
      </div>
      <!-- <div class="tech-container js-container">
        <img src="images/02-aboutme/js.png" alt="tech stack" class="tech js" />
      </div>
      <div class="tech-container nodejs-container">
        <img
          src="images/02-aboutme/nodejs.png"
          alt="tech stack"
          class="tech nodejs"
        />
      </div>
      <div class="tech-container python-container">
        <img
          src="images/02-aboutme/python.png"
          alt="tech stack"
          class="tech python"
        />
      </div>
      <div class="tech-container sql-container">
        <img
          src="images/02-aboutme/sql.png"
          alt="tech stack"
          class="tech sql"
        />
      </div>
      <div class="tech-container svelte-container">
        <img
          src="images/02-aboutme/svelte.png"
          alt="tech stack"
          class="tech svelte"
        />
      </div> -->
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
    width: 100%;
    height: auto;
    color: white;
    padding: 0;
    margin: 0;

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
        }
      }
      .tech-container {
        position: absolute;
      }
      img.tech {
        max-width: 5em;
        height: auto;
      }
      .js-container {
        top: 10%;
        left: 10%;
      }
      .nodejs-container {
        top: 40%;
        left: 7%;
      }
      .python-container {
        top: 62%;
        left: 17%;
      }
      .sql-container {
        top: 23%;
        right: 13%;
      }
      .svelte-container {
        top: 56%;
        right: 20%;
      }
      img.js {
        border-radius: 50%;
      }
    }

    .empty {
      height: 20em;
    }

    h1.title {
      margin: 0 auto 1em auto;
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
