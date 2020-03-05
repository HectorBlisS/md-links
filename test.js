let mdLinks = require("./index");

mdLinks("./test.md")
  .then(res => {
    console.log("then");
  })
  .catch(e => {
    console.log("error:", e);
  });
