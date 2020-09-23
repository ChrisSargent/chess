/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
/* eslint-disable no-void */

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const SentryCliPlugin = require("@sentry/webpack-plugin");
const CONFIG = JSON.stringify(require("config"));
const paths = require("react-scripts/config/paths");
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require("webpack");

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();

const circularDependencyPlugin = new CircularDependencyPlugin({
  exclude: /node_modules/,
  failOnError: false,
});

const configPlugin = new webpack.DefinePlugin({
  CONFIG,
});

const sentryCliPlugin = new SentryCliPlugin({
  debug: true,
  include: paths.appBuild,
});

const eslintEmitWarnings = () => (config) => {
  const eslintRule = config.module.rules.filter(
    (r) => r.use && r.use.some((u) => u.options && u.options.useEslintrc !== void 0)
  )[0];

  eslintRule.use[0].options.emitWarning = true;
  eslintRule.use[0].options.emitError = false;

  const rules = config.module.rules.map((r) =>
    r.use && r.use.some((u) => u.options && u.options.useEslintrc !== void 0) ? eslintRule : r
  );
  config.module.rules = rules;
  return config;
};

module.exports = {
  bundleAnalyzerPlugin,
  circularDependencyPlugin,
  configPlugin,
  eslintEmitWarnings,
  sentryCliPlugin,
};
