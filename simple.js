#!/usr/bin/env node
const chalk = require("chalk");
const http = require("http");
const https = require("https");
let mdLinks = require("./md-links");

let validating = "Validating... | ";
let counter = 2;

let i = process.argv.indexOf("--file");
if (i > 0) {
  let uri = process.argv[i + 1];
  useMdLinks(uri);
} else {
  console.log(
    chalk.red("Coloca el flag --file e inmediatamente la ruta del archivo")
  );
  console.log(
    chalk.yellow(`Options: 
    --file [uri of the file]
    --validate [If you want to check the links]
    --stats [to see graphs]
    `)
  );
}

async function useMdLinks(uri) {
  let links = await mdLinks(uri);
  let i = process.argv.indexOf("--validate");
  let j = process.argv.indexOf("--stats");
  if (i > 0 && j > 0) {
    validateLinks(links, true);
  } else if (i > 0) {
    validateLinks(links, false);
  } else {
    console.log("noValidation: ", links);
  }
  if (j > 0) {
    console.log("stats");
  }
}

async function validateLinks(links, stats) {
  let totals = {
    total: links.length,
    ok: 0,
    broken: 0
  };
  links.forEach((link, i) => {
    const options = {
      hostname: link.href,
      port: 443,
      // port: 80,
      path: "/",
      method: "GET"
    };

    let req = https.request(options, res => {
      const { statusCode } = res;
      if (statusCode === 200) {
        counter++;
        totals.ok += 1;
        console.log(chalk.green((validating += " ✔ ")));
        links[i].status = `${statusCode} OK ${link.text}`;
        if (counter > links.length) {
          console.log(links);
          if (stats) console.log(chalk.yellowBright("Stats: "), totals);
        }
      }
      // res.on("data", d => {
      //   process.stdout.write(d);
      // });
    });
    req.on("error", error => {
      counter++;
      totals.broken += 1;
      console.log(chalk.green((validating += " x ")));
      links[i].status = error.hostname
        ? `Fail ${error.code}  ${error.hostname}`
        : `Fail ${error.code} ${link.href}`;
      if (counter > links.length) {
        console.log(links);
        if (stats) console.log(chalk.yellowBright("Stats: "), totals);
      }
    });

    req.end();

    // if (i + 1 === links.length) {
    //   console.log(links);
    // }
  }); // forEach
  //   return { links, totals };
}

module.exports = validateLinks;
