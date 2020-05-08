const fs = require("fs");

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
    try{
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
      // console.log("Links: ", links);
      return res(links);
    }catch(e){
      return rej(e)
    }

  };
}

let mdLinks = uri => {
  return new Promise((res, rej) => tryCatch(realFunction(uri, res, rej)));
};

module.exports = mdLinks;
