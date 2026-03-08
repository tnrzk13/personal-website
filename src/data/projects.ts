import { getImagePath } from "../utils/imagePath";
import type { ProjectData } from "../types";

export const projList: ProjectData[] = [
  {
    title: "This Website!",
    imgurl: getImagePath("images/04-project/website"),
    urls: {
      projectUrl: "https://tnrzk13.github.io/personal-website/",
      codeUrl: "https://github.com/tnrzk13/personal-website",
    },
    text: "Learned a new framework, brushed up on html and css, created and solved lots of bugs. Came to the conclusion that Svelte.JS is the best JS framework.",
    techstack: ["Javascript", "Svelte"],
  },
  {
    title: "SoulDog",
    imgurl: getImagePath("images/04-project/souldog"),
    urls: {
      projectUrl: "https://souldog.herokuapp.com",
      codeUrl: "https://github.com/aarshio/SoulDog-CS348",
    },
    text: 'Webapp linked to database designed to match abandoned dogs with new dog owners. Features include account creation, Google authentication, search, and posting. Awarded "top project of the class" in CS348: Database Systems.',
    techstack: ["Javascript", "React", "Node.JS", "Knex JS", "SQL"],
  },
  {
    title: "Pneumonia Detection",
    imgurl: getImagePath("images/04-project/pneumoniaXrayIdentifier"),
    urls: {
      projectUrl: "https://huggingface.co/spaces/tnrzk13/PneumoniaDetection",
      codeUrl: "https://github.com/tnrzk13/PneumoniaXrayIdentifier",
    },
    text: "Developed a Deep Learning model using the FastAI library that diagnoses pneumonia with a 98.5% accuracy rate from chest X-ray images.",
    techstack: ["Python", "Fast.ai", "Gradio"],
  },
  {
    title: "Time Series Forecasting",
    imgurl: getImagePath("images/04-project/airpassengers"),
    urls: {
      projectUrl: "",
      codeUrl: "https://github.com/tnrzk13/TimeSeriesAirPassengers",
    },
    text: "Forecasted the number of air passengers using time series data. Used SARIMA and Holt-Winters Exponential Smoothing models to predict the number of passengers for the next 36 months.",
    techstack: ["Python", "SciKit Learn", "StatsModels", "Matplotlib", "Pandas", "SciPy"],
  },
  {
    title: "Wumpus World",
    imgurl: getImagePath("images/04-project/wumpusworld"),
    urls: {
      projectUrl: "",
      codeUrl: "https://gitfront.io/r/user-1077305/epuyjAbpQqjR/wumpusworld/",
    },
    text: "Modeled rpg-like problem using reinforcement learning algorithms such as Q-Learning and SARSA. Each algorithm was paired with one strategy (e.g. greedy, softmax, etc...) to find the best combination for the problem.",
    techstack: ["Python"],
  },
  {
    title: "Chess",
    imgurl: getImagePath("images/04-project/chess"),
    urls: {
      projectUrl: "",
      codeUrl: "https://gitfront.io/r/user-1077305/ELvfgXx6E716/chess/",
    },
    text: "Comprehensive implementation of Chess, featuring a self-designed user interface supporting both human-to-human and human-to-CPU gameplay across four different difficulty levels, with one against the chess engine itself - stockfish. Used design patterns like Observer and Factory Method.",
    techstack: ["C++", "Makefile"],
  },
];
