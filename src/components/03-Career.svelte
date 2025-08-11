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
            text: "Grew monthly revenue ",
          },
          {
            style: "bold",
            text: "$50k -> $125k",
          },
          {
            style: "none",
            text: ", users ",
          },
          {
            style: "bold",
            text: "700 -> 2k",
          },
          {
            style: "none",
            text: ", and eConsults ",
          },
          {
            style: "bold",
            text: "1.3k -> 3.3k",
          },
          {
            style: "none",
            text: " in 12 months.",
          },
        ],
        [
          {
            style: "bold",
            text: "Restored deployments and slashed build times 3x",
          },
          {
            style: "none",
            text: " by eradicating two years of tech debt; re-architecting the Typescript, React, and Firebase codebase; and migrating to Vite.",
          },
        ],
        [
          {
            style: "bold",
            text: "Hit profitability",
          },
          {
            style: "none",
            text: " by launching premium subscriptions and batched fax alerts, sustaining ",
          },
          {
            style: "bold",
            text: "7% MoM revenue, 10% user growth",
          },
          {
            style: "none",
            text: ".",
          },
        ],
        [
          {
            style: "none",
            text: "Cut client onboarding from ",
          },
          {
            style: "bold",
            text: "days to minutes",
          },
          {
            style: "none",
            text: " by automating the workflow with GCP Cloud Functions, eliminating manual errors.",
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
            text: "Turbocharged Monero payout API by converting to non‑blocking Node.js; ",
          },
          {
            style: "bold",
            text: "throughput jumped 10x (30 -> 300 req/s)",
          },
        ],
        [
          {
            style: "none",
            text: "Fortified finance endpoints with auth and balance‑validation middleware, ",
          },
          {
            style: "bold",
            text: "eradicating overdrafts and fraud",
          },
          {
            style: "none",
            text: " across ",
          },
          {
            style: "bold",
            text: "1k+",
          },
          {
            style: "none",
            text: " monthly transactions.",
          },
        ],
        [
          {
            style: "none",
            text: "Re‑indexed PostgreSQL ledgers, slicing mining‑history queries ",
          },
          {
            style: "bold",
            text: "5s -> 400ms",
          },
          {
            style: "none",
            text: " and shaving ",
          },
          {
            style: "bold",
            text: "30%",
          },
          {
            style: "none",
            text: " off DB CPU.",
          },
        ],
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-sweet-morning"
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
            text: "Slashed report generation ",
          },
          {
            style: "bold",
            text: "2 days -> 5 min",
          },
          {
            style: "none",
            text: " by automating SQL and Power Apps pipeline - freed hundreds of engineer hours and secured $1M contract.",
          },
        ],
        [
          {
            style: "none",
            text: "Architected reusable Power Apps component library adopted by six developers, saving ",
          },
          {
            style: "bold",
            text: "30 min per page",
          },
          {
            style: "none",
            text: " across 20‑page apps and standardizing UI.",
          },
        ],
        [
          {
            style: "none",
            text: "Re‑engineered database schema and views, halving bug‑fix cycles and shrinking query latency ",
          },
          {
            style: "bold",
            text: "30s -> 1s",
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
      "images/03-career/360insights." + (isBrowserSafari() ? "png" : "avif"),
      "Full Stack Developer",
      "360insights",
      ["Javascript", "Node.JS", "React"],
      [
        [
          {
            style: "none",
            text: "Deployed Node.js health‑check API for 10+ microservices to GCP, cutting mean‑time‑to‑diagnose ",
          },
          {
            style: "bold",
            text: "30 min/incident",
          },
          {
            style: "none",
            text: " and reclaiming ",
          },
          {
            style: "bold",
            text: "$15k/yr",
          },
          {
            style: "none",
            text: " for 100‑engineer org.",
          },
        ],
        [
          {
            style: "none",
            text: "Authored reusable React component kit, cutting new‑page development effort ",
          },
          {
            style: "bold",
            text: "25% (~1 h)",
          },
          {
            style: "none",
            text: ", stamping out recurring UI bugs, and unifying UX across four projects.",
          },
        ],
        [
          {
            style: "bold",
            text: "Purged legacy defects",
          },
          {
            style: "none",
            text: " and wrote exhaustive Jest suites, lifting critical‑path coverage near ",
          },
          {
            style: "bold",
            text: "100%",
          },
          {
            style: "none",
            text: " and enforcing quality gates in Jenkins CI.",
          },
        ],
      ],
      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-telegram"
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
            style: "bold",
            text: "Secured $150k pre‑seed funding",
          },
          {
            style: "none",
            text: " by supercharging model accuracy ",
          },
          {
            style: "bold",
            text: "50% -> 85%",
          },
          {
            style: "none",
            text: " via Pandas and MySQL ETL across 40k rows.",
          },
        ],
        [
          {
            style: "none",
            text: "Engineered Markov‑chain text engine for sports stats, a key feature driving pre-seed funding.",
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
            style: "bold",
            text: "Eliminated manual reporting in month #1",
          },
          {
            style: "none",
            text: " by deploying SQL and VBA Access app, slashing ",
          },
          {
            style: "bold",
            text: "300 hrs/yr",
          },
          {
            style: "none",
            text: " and saving ",
          },
          {
            style: "bold",
            text: "$10k",
          },
          {
            style: "none",
            text: ".",
          },
        ],
        [
          {
            style: "none",
            text: "Accelerated insight delivery and sliced data‑entry errors ",
          },
          {
            style: "bold",
            text: "40%",
          },
          {
            style: "none",
            text: " by revamping client dashboards.",
          },
        ],
      ],

      getComputedStyle(document.querySelector(":root")).getPropertyValue(
        "--gradient-amin"
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
            text: "Productized historical-price + ratio-analysis endpoints behind the trading UI, turning multi-step Excel workflows into 1-click charts and ",
          },
          {
            style: "bold",
            text: "saving traders 100+ hours",
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
