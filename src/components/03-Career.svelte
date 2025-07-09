<script>
  import Card from "./Cards/CardCareer.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
  import { isBrowserSafari } from "./Browser/BrowserCheck.svelte";

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
    new CardClass(
      "images/03-career/alethea." + (isBrowserSafari() ? "png" : "avif"),
      "Software Engineer",
      "Alethea",
      ["React", "Typescript", "Firebase", "Vite", "Typesense"],
      [
        [
          {
            style: "none",
            text: "Contributed to a 7% month-over-month revenue growth and a 10% increase in monthly users by delivering key features that met the evolving needs of the user base.",
          },
        ],
        [
          {
            style: "none",
            text: "Increased billing revenue by ",
          },
          {
            style: "bold",
            text: "$10k month-over-month",
          },
          {
            style: "none",
            text: " by developing eConsult filters for specialist physicians on the platform.",
          },
        ],
        [
          {
            style: "none",
            text: "Increased product efficiency by ",
          },
          {
            style: "bold",
            text: "20%",
          },
          {
            style: "none",
            text: " by creating an internal testing architecture, and refactoring the codebase to updated packages.",
          },
        ],
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-terminal"
      )
    ),
    new CardClass(
      "images/03-career/myriade." + (isBrowserSafari() ? "png" : "avif"),
      "Software Developer",
      "Myriade",
      ["Node.js", "Express.js", "PostgreSQL"],
      [
        [
          {
            style: "none",
            text: "Optimized the platform's performance by ",
          },
          {
            style: "bold",
            text: "30%",
          },
          {
            style: "none",
            text: " through non-blocking I/O model and middleware functions using Node.js and Express.js, reducing response time and increasing efficiency.",
          },
        ],
        [
          {
            style: "none",
            text: "Implemented a PostgreSQL database, decreasing downtime by ",
          },
          {
            style: "bold",
            text: "40%",
          },
          {
            style: "none",
            text: " and data retrieval speed by 50%, leading to improved application performance.",
          },
        ],
        [
          {
            style: "none",
            text: "Streamlined development and production environments using Docker-Compose, boosting deployment efficiency by ",
          },
          {
            style: "bold",
            text: "40%",
          },
          {
            style: "none",
            text: ".",
          },
        ],
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-sweet-morning"
      )
    ),
        new CardClass(
      "images/03-career/jpmorgan." + (isBrowserSafari() ? "png" : "avif"),
      "Software Engineering Virtual Experience Program",
      "J.P. Morgan",
      ["React"],
      [
        [
          {
            style: "none",
            text: "Improved data visualization by implementing RESTful APIs to display historical stock prices and comparative ratio analysis to ",
          },
          {
            style: "bold",
            text: "save traders >100 hours",
          },
          {
            style: "none",
            text: ".",
          },
        ],
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-very-blue"
      )
    ),
    new CardClass(
      "images/03-career/goldman." + (isBrowserSafari() ? "png" : "avif"),
      "Software Engineering Virtual Experience Program",
      "Goldman Sachs",
      ["Hashcat"],
      [
        [
          {
            style: "none",
            text: "Leveraged Hashcat to identify vulnerabilities inherent in the outdated hashing algorithm, and proposed measures to ",
          },
          {
            style: "bold",
            text: "bolster password security by 10,000x",
          },
          {
            style: "none",
            text: ".",
          },
        ],
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-skyline"
      )
    ),
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
            text: "saving $1500 annually per team",
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
        [
          {
            style: "none",
            text: "Enhanced the codebase by resolving 10 critical bugs, implemented comprehensive test suites using Jest, and contributed to the CI/CD pipeline, accelerating deployment processes and ",
          },
          {
            style: "bold",
            text: "boosting overall application performance by 10%",
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
            text: "Automated data reporting and created a unified reporting system through SQL and Power Apps to ",
          },
          {
            style: "bold",
            text: "reduce cost by >$1M",
          },
          {
            style: "none",
            text: ".",
          },
        ],
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
            text: "by reducing time spent on bug fixing and minimizing joins.",
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
            text: "Developed a data collection, cleaning, and preprocessing script with Pandas and MySQL, which lead to a model accuracy of >85%, contributing to a",
          },
          {
            style: "bold",
            text: "successful MVP launch and $160k funding for pre-seed",
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
            text: "Designed and developed a data reporting app using SQL, VBA, and MS Access, ",
          },
          {
            style: "bold",
            text: "saving $10,000 annually ",
          },
          {
            style: "none",
            text: "through reducing data reporting time by 300 hours",
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
    border: none;
    height: auto;

    .card {
      background-color: transparent;
      background-image: none;
    }

    #card-list-container {
      padding: 0;
    }
  }
</style>
