const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const configFactory = (entryDir, buildDir, isEnvProduction) => {
  const exclude = /node_modules/;

  return {
    devtool: isEnvProduction ? "source-map" : "cheap-module-source-map",
    entry: path.join(entryDir, "index"),
    mode: isEnvProduction ? "production" : "development",
    module: {
      // Suppress Warnings Like: `Critical dependency: the request of a dependency is an expression`
      exprContextCritical: false,
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        {
          enforce: "pre",
          exclude,
          test: /\.(js|ts)$/,
          use: [
            {
              loader: "eslint-loader",
              options: {
                emitWarning: true,
              },
            },
          ],
        },
        {
          exclude,
          loader: "babel-loader",
          options: {
            cacheCompression: isEnvProduction,
            cacheDirectory: true,
            compact: isEnvProduction,
          },
          test: /\.(js|ts)$/,
        },
      ],
      strictExportPresence: true,
    },
    output: {
      filename: "index.js",
      libraryTarget: "commonjs2",
      path: buildDir,
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!package.json"],
      }),
      new CopyPlugin({
        patterns: [
          {
            force: true,
            from: path.join(entryDir, "event.json"),
          },
        ],
      }),
    ],
    resolve: {
      extensions: [".mjs", ".ts", ".tsx", ".js", ".json"],
    },
    target: "node",
  };
};

module.exports = configFactory;
