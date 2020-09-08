const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const configFactory = require("./webpack.config");
const { getDirs, handler } = require("./utils");

if (process.env.NODE_ENV !== "development") {
  throw new Error("NODE_ENV must be set to development");
}

const config = [];

const functionsDir = path.join(process.cwd(), "..", "amplify", "backend", "function");
const funcDirs = getDirs(functionsDir);

funcDirs.forEach((funcName) => {
  const buildDir = path.join(functionsDir, funcName, "src");
  const entryDir = path.join(process.cwd(), "src", funcName);
  config.push(configFactory(fs.realpathSync(entryDir), fs.realpathSync(buildDir), false));
});

const compiler = webpack(config);
compiler.watch({}, handler);
