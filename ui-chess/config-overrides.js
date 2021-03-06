/* eslint-disable @typescript-eslint/no-var-requires */

const {
  addWebpackPlugin,
  adjustWorkbox,
  disableChunk,
  override,
  useBabelRc,
} = require("customize-cra");
const overrides = require("./webpack");

const hasSentry = !!process.env.SENTRY_AUTH_TOKEN;
const analyze = process.argv.includes("--analyze");

module.exports = override(
  useBabelRc(),
  // Because AirBNB eslint always emits errors which can be annoying, switch the webpack eslint loader to only display warnings instead
  disableChunk(),
  overrides.eslintEmitWarnings(),
  addWebpackPlugin(overrides.inlineHtmlPlugin),
  addWebpackPlugin(overrides.circularDependencyPlugin),
  analyze && addWebpackPlugin(overrides.bundleAnalyzerPlugin),
  hasSentry && addWebpackPlugin(overrides.sentryCliPlugin),
  adjustWorkbox((wb) =>
    Object.assign(wb, {
      exclude: (wb.exclude || []).concat("index.html"),
    })
  )
);
