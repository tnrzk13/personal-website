<script>
  import Techstack from "./Misc/Techstack.svelte";
  import { isBrowserSafari } from "./Browser/BrowserCheck.svelte";

  let techstack = ["Typescript", "React", "Python", "SQL", "Node.JS", "Firebase"];
</script>

<div id="aboutme" class="aboutMe container-fluid col-sm-10 offset-sm-1">
  <div class="empty row" />
  <h1 class="title col-md-9">A little about me</h1>
  <div class="row col-md-9">
    <div class="text col-md-7">
      <div class="description">
        I'm a full-stack engineer (TS/React/GCP) who turns tech debt into growth - I've tripled revenue, 10x'd throughput, and turned companies profitable. Looking for a role where shipping, reliability, and revenue are on the scorecard - and I'm accountable for all three. 
        <br /><br />
        My interest in tech began during my first co-op term as an accountant, when I
        needed to manipulate data in Excel. I went from keyboard shortcuts to
        VBA to SQL to transferring out of my accounting program and into engineering roles. Read more about my story in the next section.
        <br /> <br />
        Here are a few technologies I’ve been working with:
        <br /><br />
      </div>
      <div class="row techlist1 m-0 p-0">
        <div class="row">
          <Techstack {techstack} />
        </div>
      </div>
    </div>
    <div class="imgdiv col-md-5">
      <div class="aboutmeimg-container">
        <a href="https://www.linkedin.com/in/tony-k-kwok/">
          <img
            class="aboutmeimg"
            src="images/02-aboutme/self.{isBrowserSafari() ? 'png' : 'avif'}"
            alt="tony kwok"
          />
        </a>
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

        img.aboutmeimg:hover {
          scale: 110%;
          transition: 0.5s;
          box-shadow: 0 0 65px #6dd5fa, 0 0 0 1px rgb(255 255 255 / 10%),
            0 2px 2px rgb(0 0 0 / 3%), 0 4px 4px rgb(0 0 0 / 4%),
            0 10px 8px rgb(0 0 0 / 5%), 0 15px 15px rgb(0 0 0 / 6%),
            0 30px 30px rgb(0 0 0 / 7%), 0 70px 65px rgb(0 0 0 / 9%);
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
      font-size: 1em;
    }
    .description {
      box-sizing: border-box;
    }
  }
</style>
