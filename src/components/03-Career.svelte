<script>
  import Card from "./Cards/CardCareer.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
  import { isBrowserSafari } from "./Browser/BrowserCheck.svelte";
  import GradientButton from "./Button/GradientButton.svelte";

  export let mdScreenSize = 992;

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
    // new CardClass(
    //   "images/03-career/myriade." + (isBrowserSafari() ? "png" : "avif"),
    //   "Full Stack Developer",
    //   "Myriade",
    //   ["PostgreSQL", "Node.JS", "Express.JS", "Docker"],
    //   [
    //     [
    //       {
    //         style: "bold",
    //         text: "Optimized the platform's performance by 30% ",
    //       },
    //       {
    //         style: "none",
    //         text: "through non-blocking I/O model and middleware functions using Node.js and Express.js, reducing response time and increasing efficiency.",
    //       },
    //     ],
    //     [
    //       {
    //         style: "none",
    //         text: "Implemented a PostgreSQL database, ",
    //       },
    //       {
    //         style: "bold",
    //         text: "decreasing downtime by 40% and data retrieval speed by 50%",
    //       },
    //       {
    //         style: "none",
    //         text: "leading to improved application performance.",
    //       },
    //     ],
    //   ],
    //   getComputedStyle(document.querySelector(":root")).getPropertyValue(
    //     "--gradient-flare"
    //   )
    // ),
    new CardClass(
      "images/03-career/360insights." + (isBrowserSafari() ? "png" : "avif"),
      "Full Stack Developer",
      "360insights",
      ["Javascript", "Node.JS", "React"],
      [
        [
          {
            style: "none",
            text: "Developed a health-check API for testing and displaying the availability of 10+ internal services using Node.js, ",
          },
          {
            style: "bold",
            text: "saving developer time on debugging and reducing potential service downtime",
          },
          {
            style: "none",
            text: ".",
          },
        ],
        [
          {
            style: "none",
            text: "Built reusable UI components using React.js for client sales portals, ",
          },
          {
            style: "bold",
            text: "decreasing project maintenance by 20%",
          },
          {
            style: "none",
            text: ".",
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
            style: "none",
            text: "Introduced a database schema that resolved and prevented data conflicts, ",
          },
          {
            style: "bold",
            text: "improving development efficiency by 25%",
          },
          {
            style: "none",
            text: " and reducing time spent on bug fixing.",
          },
        ],
        [
          {
            style: "none",
            text: "Automated data reporting through Power BI and Power Automate, completely ",
          },
          {
            style: "bold",
            text: "eliminating manual reporting time and ensuring up-to-date insights",
          },
          {
            style: "none",
            text: ".",
          },
        ],
        [
          {
            style: "none",
            text: "Developed UI standards and a component library in Power Apps, ",
          },
          {
            style: "bold",
            text: "enhancing app development efficiency by 20%",
          },
          {
            style: "none",
            text: ".",
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
            text: "Developed a data collection, cleaning, and preprocessing script with Pandas and MySQL, ",
          },
          {
            style: "bold",
            text: "improving the accuracy of NBA game prediction models by 50%",
          },
          {
            style: "none",
            text: " and contributing to a ",
          },
          {
            style: "bold",
            text: "successful MVP launch",
          },
          {
            style: "none",
            text: ".",
          },
        ],
        [
          {
            style: "none",
            text: "Created a Markov chain to translate raw data into descriptive text, enhancing user understanding of NBA metrics .",
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
            text: "Designed and developed a data reporting app using SQL, VBA, and MS Access, automating the reporting process, ",
          },
          {
            style: "bold",
            text: "saving 300 hours of work annually",
          },
          {
            style: "none",
            text: ", and facilitating the work turnover process.",
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
    <SimpleGrid cols={window.innerWidth < mdScreenSize ? 1 : 2}>
      {#each cardList as { imgurl, title, subtitle, techstack, points, logoColor }}
        <Card {imgurl} {title} {subtitle} {techstack} {points} {logoColor} />
      {/each}
    </SimpleGrid>
    <!-- <br /><br /><br /> -->
    <!-- <div id="resume-container">
      <div class="resume-leader col-sm-6 offset-sm-3">
        <h4>Want to find out more? Download my resume here!</h4>
      </div>
      <div class="gradient-button-container col-sm-6 offset-sm-3">
        <a href="download/Resume.pdf" download="TonyKwokResume">
          <GradientButton
            text="Resume"
            buttonGradient={getComputedStyle(
              document.querySelector(":root")
            ).getPropertyValue("--gradient-button-red-blue")}
          />
        </a>
      </div>
    </div> -->
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
