import { getImagePath } from "../utils/imagePath";
import type { ProjectData } from "../types";

export const projList: ProjectData[] = [
  {
    title: "Pneumonia Detection",
    imgurl: getImagePath("images/04-project/pneumoniaXrayIdentifier"),
    urls: {
      projectUrl: "https://huggingface.co/spaces/tnrzk13/PneumoniaDetection",
      codeUrl: "https://github.com/tnrzk13/PneumoniaXrayIdentifier",
    },
    text: "Deep Learning model that diagnoses pneumonia with <strong>98.5% accuracy</strong> from chest X-ray images, built with FastAI and deployed on HuggingFace.",
    techstack: ["Python", "Fast.ai", "Gradio"],
    tags: ["ML"],
    featured: true,
  },
  {
    title: "SoulDog",
    imgurl: getImagePath("images/04-project/souldog"),
    urls: {
      projectUrl: "https://souldog.herokuapp.com",
      codeUrl: "https://github.com/aarshio/SoulDog-CS348",
    },
    text: 'Awarded <strong>"top project of the class"</strong> in CS348: Database Systems. Full-stack webapp matching abandoned dogs with new owners, featuring Google auth, search, and posting.',
    techstack: ["Javascript", "React", "Node.JS", "Knex JS", "SQL"],
    tags: ["Web"],
    featured: true,
  },
  {
    title: "Time Series Forecasting",
    imgurl: getImagePath("images/04-project/airpassengers"),
    urls: {
      projectUrl: "",
      codeUrl: "https://github.com/tnrzk13/TimeSeriesAirPassengers",
    },
    text: "Forecasted air passenger volumes <strong>36 months ahead</strong> using SARIMA and Holt-Winters Exponential Smoothing models.",
    techstack: ["Python", "SciKit Learn", "StatsModels", "Matplotlib", "Pandas", "SciPy"],
    tags: ["ML"],
    featured: true,
  },
  {
    title: "This Website!",
    imgurl: getImagePath("images/04-project/website"),
    urls: {
      projectUrl: "https://tnrzk13.github.io/personal-website/",
      codeUrl: "https://github.com/tnrzk13/personal-website",
    },
    text: "Built with <strong>Svelte</strong> from scratch - learned a new framework, brushed up on HTML and CSS, and solved lots of bugs along the way.",
    techstack: ["Javascript", "Svelte"],
    tags: ["Web"],
  },
  {
    title: "Chess",
    imgurl: getImagePath("images/04-project/chess"),
    urls: {
      projectUrl: "",
      codeUrl: "https://gitfront.io/r/user-1077305/ELvfgXx6E716/chess/",
    },
    text: "Full chess implementation with <strong>4 difficulty levels</strong> including Stockfish, supporting human-vs-human and human-vs-CPU. Built with Observer and Factory Method patterns.",
    techstack: ["C++", "Makefile"],
    tags: ["Systems"],
  },
  {
    title: "Wumpus World",
    imgurl: getImagePath("images/04-project/wumpusworld"),
    urls: {
      projectUrl: "",
      codeUrl: "https://gitfront.io/r/user-1077305/epuyjAbpQqjR/wumpusworld/",
    },
    text: "Solved an RPG-like problem using <strong>reinforcement learning</strong> (Q-Learning, SARSA) paired with exploration strategies (greedy, softmax) to find optimal combinations.",
    techstack: ["Python"],
    tags: ["ML"],
  },
];
