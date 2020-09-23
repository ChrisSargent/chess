const trailingSlash = (str) => str.replace(/^\/|\/$/g, "");

const template = ({ compilation, htmlWebpackPlugin }) => {
  const jsFiles = htmlWebpackPlugin.files.js;
  const cssFiles = htmlWebpackPlugin.files.css;
  const scripts = jsFiles.map((jsFile) => compilation.assets[trailingSlash(jsFile)].source());
  const styles = cssFiles.map((cssFile) => compilation.assets[trailingSlash(cssFile)].source());
  const favicon = htmlWebpackPlugin.files.favicon
    ? `<link rel="shortcut icon" href="${htmlWebpackPlugin.files.favicon} />`
    : "";
  return `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charset="utf-8" />
      <title>${htmlWebpackPlugin.options.title || "Webpack App"}</title>
      ${favicon}
      ${styles.map((style) => `<style>${style}</style>`)}
      </head>
      <body>
      <div id="root"></div>
      ${scripts.map((script) => `<script>${script}</script>`)}
    </body>
  </html>
`;
};

module.exports = template;
