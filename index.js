#!/usr/bin/env node
const mdLinks = require("./md-links");
const validateLinks = require("./simple");
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
  let links = await mdLinks(responses.uriFile);
  let validate = await questions.askForValidation();
  validate = validate.validate === "y" ? true : false;
  if (validate) {
    let stats = await questions.askForStats();
    stats = stats.stats === "y" ? true : false;
    let r = await validateLinks(links, stats);
    console.log("finally: ", r);
  } else {
    console.log(links);
  }
}
init();
module.exports = mdLinks;
