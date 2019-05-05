const path = require("path");

module.exports = {
  app: path.resolve(),
  modules: "react-scripts/config/modules.js",
  wpConfig: "react-scripts/config/webpack.config",
  jsconfig: path.resolve("jsconfig.json"),
  tsconfig: path.resolve("tsconfig.json")
};
