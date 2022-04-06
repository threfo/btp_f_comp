const child_process = require("child_process");

const copyDir = (src, dist) => {
  console.log("copyDir src:", src, "dist:", dist);
  child_process.spawn("cp", ["-r", , src, dist]);
};

const args = require("minimist")(process.argv.slice(2));
console.log("args", args);

copyDir("./packages", `./docs${args["v"] || ""}`);
