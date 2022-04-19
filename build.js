const fs = require("fs")

const plugins = [
  [
    "@babel/plugin-proposal-pipeline-operator", {
      topicToken: "^",
      proposal: "hack"
    }
  ],
]

require("@babel/core")
  .transformFileAsync("./fn/index.js", { plugins })
  .then(({ code }) => {
    fs.writeFile("./index.js", code, { encoding: "utf-8" }, () => { })
  });
