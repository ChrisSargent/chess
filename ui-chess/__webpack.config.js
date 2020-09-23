const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const template = require("./template");

const configFactory = () => {
  const exclude = /node_modules/;
  const isEnvProduction = process.env.NODE_ENV === "production";

  return {
    devtool: isEnvProduction ? "none" : "cheap-module-source-map",
    devServer: {
      contentBase: "./build",
    },
    entry: path.resolve(__dirname, "src", "index"),
    mode: isEnvProduction ? "production" : "development",
    module: {
      // Suppress Warnings Like: `Critical dependency: the request of a dependency is an expression`
      exprContextCritical: false,
      rules: [
        {
          // See: https://github.com/jhlywa/chess.js/issues/196
          test: require.resolve("chess.js"),
          parser: {
            amd: false,
          },
        },
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        // {
        //   enforce: "pre",
        //   exclude,
        //   test: /\.(js|ts)$/,
        //   use: [
        //     {
        //       loader: "eslint-loader",
        //       options: {
        //         emitWarning: true,
        //       },
        //     },
        //   ],
        // },
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
      filename: "bundle.js",
      libraryTarget: "window",
      path: path.resolve(__dirname, "./build"),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        title: "Chess Engine",
        templateContent: template,
      }),
    ],
    resolve: {
      extensions: [".mjs", ".ts", ".tsx", ".js", ".json"],
    },
    target: "web",
  };
};

module.exports = configFactory;
