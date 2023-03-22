var ghpages = require("gh-pages");

ghpages.publish(
  "public",
  {
    branch: "main",
    repo: "https://github.com/tnrzk13/personal-website.git",
    user: {
      name: "tnrzk13",
      email: "tnrzk13@gmail.com",
    },
  },
  () => {
    console.log("Deploy Complete!");
  }
);
