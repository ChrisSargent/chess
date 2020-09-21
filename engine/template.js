const template = ({ compilation, htmlWebpackPlugin }) => {
  const jsFiles = htmlWebpackPlugin.files.js;
  const scripts = jsFiles.map((jsFile) => compilation.assets[jsFile].source());
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
      ${scripts.map((script) => `<script>${script}</script>`)}
    </head>
    <body>
      Chess engine is running in JavaScript
    </body>
  </html>
`;
};

module.exports = template;
