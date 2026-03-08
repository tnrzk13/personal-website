import { getImagePath } from "../utils/imagePath";
import type { CareerCard } from "../types";

export const cardList: CareerCard[] = [
  {
    imgurl: getImagePath("images/03-career/alethea"),
    title: "Software Engineer",
    subtitle: "Alethea",
    techstack: ["React", "Typescript", "Firebase", "Vite", "Typesense"],
    points: [
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
    logoColor: "var(--gradient-terminal)",
  },
  {
    imgurl: getImagePath("images/03-career/myriade"),
    title: "Software Developer",
    subtitle: "Myriade",
    techstack: ["Node.js", "Express.js", "PostgreSQL"],
    points: [
      [
        {
          style: "none",
          text: "Turbocharged Monero payout API by converting to non\u2011blocking Node.js; ",
        },
        {
          style: "bold",
          text: "throughput jumped 10x (30 -> 300 req/s)",
        },
      ],
      [
        {
          style: "none",
          text: "Fortified finance endpoints with auth and balance\u2011validation middleware, ",
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
          text: "Re\u2011indexed PostgreSQL ledgers, slicing mining\u2011history queries ",
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
    logoColor: "var(--gradient-sweet-morning)",
  },
  {
    imgurl: getImagePath("images/03-career/npx"),
    title: "Innovation Catalyst Intern",
    subtitle: "Nuclear Promise X",
    techstack: ["MSPowerApps", "PowerBI", "SQL", "Python"],
    points: [
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
          text: " across 20\u2011page apps and standardizing UI.",
        },
      ],
      [
        {
          style: "none",
          text: "Re\u2011engineered database schema and views, halving bug\u2011fix cycles and shrinking query latency ",
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
    logoColor: "var(--gradient-lunada)",
  },
  {
    imgurl: getImagePath("images/03-career/360insights"),
    title: "Full Stack Developer",
    subtitle: "360insights",
    techstack: ["Javascript", "Node.JS", "React"],
    points: [
      [
        {
          style: "none",
          text: "Deployed Node.js health\u2011check API for 10+ microservices to GCP, cutting mean\u2011time\u2011to\u2011diagnose ",
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
          text: " for 100\u2011engineer org.",
        },
      ],
      [
        {
          style: "none",
          text: "Authored reusable React component kit, cutting new\u2011page development effort ",
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
          text: " and wrote exhaustive Jest suites, lifting critical\u2011path coverage near ",
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
    logoColor: "var(--gradient-telegram)",
  },
  {
    imgurl: getImagePath("images/03-career/quarter4"),
    title: "Database Specialist",
    subtitle: "Quarter4",
    techstack: ["Python", "SQL"],
    points: [
      [
        {
          style: "bold",
          text: "Secured $150k pre\u2011seed funding",
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
          text: "Engineered Markov\u2011chain text engine for sports stats, a key feature driving pre-seed funding.",
        },
      ],
    ],
    logoColor: "var(--gradient-cosmic-fusion)",
  },
  {
    imgurl: getImagePath("images/03-career/marsh"),
    title: "Business Application Developer",
    subtitle: "Marsh",
    techstack: ["VBA"],
    points: [
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
          text: "Accelerated insight delivery and sliced data\u2011entry errors ",
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
    logoColor: "var(--gradient-amin)",
  },
  {
    imgurl: getImagePath("images/03-career/jpmorgan"),
    title: "Software Engineering Virtual Experience Program",
    subtitle: "J.P. Morgan",
    techstack: ["React"],
    points: [
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
    logoColor: "var(--gradient-very-blue)",
  },
  {
    imgurl: getImagePath("images/03-career/goldman"),
    title: "Software Engineering Virtual Experience Program",
    subtitle: "Goldman Sachs",
    techstack: ["Hashcat"],
    points: [
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
    logoColor: "var(--gradient-skyline)",
  },
];
