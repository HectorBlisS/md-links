#!/usr/bin/env node
const mdLinks = require("./md-links");
// fancy stuff
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const questions = require("./questions");

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
