/* eslint-disable no-console */
const { readdirSync, statSync } = require("fs");
const path = require("path");

const handler = (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  console.info(
    stats.toString({
      builtAt: false, // Removes built at time
      colors: true, // Shows colors in the console
      entrypoints: false, // Removes entry point info, e.g. Entrypoint main = index.js index.js.map
      hash: false, // Removes hash info
      modules: false, // Removes details about modules that were built, e.g. [./lib/index.js] 632 bytes {main} [built]
      version: false, // Removes webpack version info
    })
  );
};

const getDirs = (p) => readdirSync(p).filter((f) => statSync(path.join(p, f)).isDirectory());

module.exports = { getDirs, handler };
