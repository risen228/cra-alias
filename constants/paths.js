const path = require("path");

const app = path.resolve();
const packageJson = app + "/package.json";
const scripts = app + "/node_modules/react-scripts";

module.exports = {
  app,
  packageJson,
  scripts,
  wpConfig: scripts + "/config/webpack.config.js",
  createJestConfig: scripts + "/scripts/utils/createJestConfig.js",
  jsconfig: app + "/jsconfig.json",
  tsconfig: app + "/tsconfig.json"
};
