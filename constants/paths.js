const path = require("path");

const app = path.resolve();
const scripts = app + "/node_modules/react-scripts";

module.exports = {
  app,
  scripts,
  wpConfig: scripts + "/config/webpack.config.js",
  jsconfig: app + "/jsconfig.json",
  tsconfig: app + "/tsconfig.json"
};
