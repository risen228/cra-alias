const fs = require("fs");
const path = require("path");

const paths = require("../../constants/paths");
const { errorsKeys } = require("../../constants/errorsData");
const getError = require("../getError");

const extract = require("./extract");

const processConfig = (configPath, options = {}) => {
  if (!fs.existsSync(configPath)) {
    return {
      result: "failure",
      error: getError(errorsKeys.CONFIG_NOT_EXIST)
    };
  }

  let config = require(configPath);

  if (options.isTS) {
    if (!config.extends) {
      return {
        result: "failure",
        error: getError(errorsKeys.TSCONFIG_IS_NOT_EXTENDED)
      };
    }

    config = require(path.resolve(paths.app, config.extends));
  }

  return extract(config);
};

module.exports = () => {
  const results = {
    jsconfig: processConfig(paths.jsconfig),
    tsconfig: processConfig(paths.tsconfig, { isTS: true })
  };

  const resultsValues = Object.values(results);

  if (resultsValues.every(r => r.result !== "success")) {
    if (
      resultsValues.every(r => r.error.code === errorsKeys.CONFIG_NOT_EXIST)
    ) {
      return {
        result: "failure",
        message: "No jsconfig.json or tsconfig.json in project directory"
      };
    }

    for (let configName in results) {
      const { result, error } = results[configName];

      if (error.code === errorsKeys.CONFIG_NOT_EXIST) {
        continue;
      }

      if (result !== "success") {
        return {
          result,
          error
        };
      }
    }
  }

  return resultsValues.find(r => r.result === "success");
};
