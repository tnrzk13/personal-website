<script>
  import Card from "./Cards/CardCareer.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
  import { isBrowserSafari } from "./Browser/BrowserCheck.svelte";
  import { text } from "svelte/internal";
  import GradientButton from "./Button/GradientButton.svelte";

  export let boolFadeAnimation = false;

  let smScreenSize = 576;

  class PointPart {
    constructor(style, text) {
      Object.assian(this, { style, text });
    }
  }
  class CardClass {
    constructor(imgurl, title, subtitle, techstack, points, logoColor) {
      Object.assign(this, {
        imgurl,
        title,
        subtitle,
        techstack,
        points,
        logoColor,
      });
    }
  }
  let cardList = [
    new CardClass(
      "images/03-career/360insights." + (isBrowserSafari() ? "png" : "avif"),
      "Full Stack Developer",
      "360insights",
      ["Javascript", "Node.JS", "React"],
      [
        [
          {
            style: "none",
            text: "Created API to test availability of internal services using Node.js, ",
          },
          {
            style: "bold",
            text: "reducing debugging time by 10 mins for the team",
          },
        ],
        [
          {
            style: "none",
            text: "Developed React.js components for client sales portals, resulting in satisfied clients",
          },
        ],
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-telegram"
      )
    ),
    new CardClass(
      "images/03-career/npx." + (isBrowserSafari() ? "png" : "avif"),
      "Innovation Catalyst Intern",
      "Nuclear Promise X",
      ["MSPowerApps", "PowerBI", "SQL", "Python"],
      [
        [
          {
            style: "bold",
            text: "Automated data reports to reduce data reporting time to zero",
          },
          {
            style: "none",
            text: ", using Power BI and Power Automate to feed data into a reporting app in real time",
          },
        ],
        [
          {
            style: "none",
            text: "Developed UI standards and component library in Power Apps to ",
          },
          {
            style: "bold",
            text: "increase app development efficiency by >20%",
          },
        ],
        [
          {
            style: "none",
            text: "Redesigned database schema to solve and prevent future data conflicts",
          },
        ],
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-lunada"
      )
    ),
    new CardClass(
      "images/03-career/quarter4." + (isBrowserSafari() ? "png" : "avif"),
      "Database Specialist",
      "Quarter4",
      ["Python", "SQL"],
      [
        [
          {
            style: "none",
            text: "Scraped and cleaned data using Pandas and MySQL, ",
          },
          {
            style: "bold",
            text: "allowing model prediction accuracy to rise >75%",
          },
        ],
        [
          {
            style: "none",
            text: "Created Markov chain for data description using python for end user to understand key data points",
          },
        ],
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-cosmic-fusion"
      )
    ),
    new CardClass(
      "images/03-career/marsh." + (isBrowserSafari() ? "png" : "avif"),
      "Business Application Developer",
      "Marsh",
      ["VBA"],
      [
        [
          {
            style: "none",
            text: "Pitched, designed, and developed app for data reporting in SQL, VBA, MS Access",
          },
        ],
        [
          {
            style: "bold",
            text: "Resulted in complete automation of 1hr of reporting time daily to the sales department, and the primary role of co-ops",
          },
        ],
      ],

      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-amin"
      )
    ),
  ];
</script>

<div id="career" class="container-fluid col-sm-10 col-sm-1">
  <h1 class="title col-md-9">My last couple adventures</h1>
  <div id="card-list-container" class="card container-fluid col-md-9">
    <SimpleGrid cols={window.innerWidth < smScreenSize ? 1 : 2}>
      {#each cardList as { imgurl, title, subtitle, techstack, points, logoColor }}
        <Card
          {imgurl}
          {title}
          {subtitle}
          {techstack}
          {points}
          {logoColor}
          {boolFadeAnimation}
        />
      {/each}
    </SimpleGrid>
    <br /><br /><br />
    <div id="resume-container">
      <div class="resume-leader col-sm-6 offset-sm-3">
        <h4>Want to find out more? Download my resume here!</h4>
      </div>
      <div class="gradient-button-container col-sm-6 offset-sm-3">
        <a href="download/Resume.pdf" download="TonyKwokResume">
          <GradientButton
            text="Download Resume"
            buttonGradient={getComputedStyle(
              document.querySelector(":root")
            ).getPropertyValue("--gradient-button-red-blue")}
          />
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  h1.title {
    background-image: var(--gradient-cool-sky);
  }
  #career {
    border: 1px solid transparent;
  }
  .container-fluid {
    // border: 5px solid white;
    border: none;
    height: auto;

    .card {
      background-color: transparent;
      background-image: none;
    }

    #card-list-container {
      padding: 0;
    }

    #resume-container {
      text-align: center;

      .gradient-button-container {
        display: flex;
        justify-content: center;
      }

      a {
        text-decoration: none;
      }
    }
  }
</style>
