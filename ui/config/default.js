// eslint-disable-next-line @typescript-eslint/naming-convention
const { npm_package_version } = process.env;

module.exports = {
  appVersion: npm_package_version,
};
