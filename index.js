#!/usr/bin/env node
const fs = require("fs");
const md = require("markdown-it")();
// fancy stuff
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const questions = require("./questions");

function tryCatch(func) {
  try {
    func();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

function realFunction(uri, res, rej) {
  return async () => {
    let links = [];
    let data = fs.readFileSync(uri, "utf8");
    let output = data.replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, x => {
      if (x === "#") return;
      let obj = {
        href: x
          .replace(/\(/g, "")
          .replace(/\)/g, "")
          .split("]")[1]
          .replace(/'/g, "")
          .replace(/"/g, ""),
        text: x
          .replace(/\[/g, "")
          .replace(/\]/g, "")
          .split("(")[0]
          .replace(/'/g, "")
          .replace(/"/g, ""),
        file: uri
      };
      links.push(obj);
    });
    console.log("Links: ", links);
  };
}

let mdLinks = uri => {
  return new Promise((res, rej) => tryCatch(realFunction(uri, res, rej)));
};

module.exports = mdLinks;

async function init() {
  clear();
  console.log(
    chalk.yellow(figlet.textSync("Made", { horizontalLayout: "full" })),
    chalk.white(figlet.textSync("with <3", { horizontalLayout: "full" })),
    chalk.green(figlet.textSync("by BlisS"))
  );
  const responses = await questions.askForTheFile();
  mdLinks(responses.uriFile);
}
init();
