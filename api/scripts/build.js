const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const configFactory = require("./webpack.config");
const { handler } = require("./utils");

if (process.env.NODE_ENV !== "production") {
  throw new Error("NODE_ENV must be set to production");
}

const funcName = process.argv[2];
if (!funcName) {
  throw new Error("Function name must be provided as a cmd line arg");
}
const buildDir = path.join(process.cwd(), "..", "amplify", "backend", "function", funcName, "src");
const entryDir = path.join(process.cwd(), "src", funcName);

const config = configFactory(fs.realpathSync(entryDir), fs.realpathSync(buildDir), true);
const compiler = webpack(config);
compiler.run(handler);
