const template = ({ compilation, htmlWebpackPlugin }) => {
  const jsFiles = htmlWebpackPlugin.files.js;
  const cssFiles = htmlWebpackPlugin.files.css;
  const scripts = jsFiles.map((jsFile) => compilation.assets[jsFile].source());
  const styles = cssFiles.map((cssFile) => compilation.assets[cssFile.source()]);
  const favicon = htmlWebpackPlugin.files.favicon
    ? `<link rel="shortcut icon" href="${htmlWebpackPlugin.files.favicon} />`
    : "";
  return `
  <html>
    <head>
      ${htmlWebpackPlugin.tags.headTags}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charset="utf-8" />
      <title>${htmlWebpackPlugin.options.title || "Webpack App"}</title>
      ${favicon}
      ${styles.map((script) => `<style>${script}</script>`)}
      ${scripts.map((script) => `<script>${script}</script>`)}
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`;
};

module.exports = template;
