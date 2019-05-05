const fs = require("fs");

const paths = require("../../constants/paths");
const { errorsKeys } = require("../../constants/errorsData");
const getError = require("../getError");

const extract = require("./extract");

const processConfig = configPath => {
  if (!fs.existsSync(configPath)) {
    return {
      result: "failure",
      error: getError(errorsKeys.CONFIG_NOT_EXIST)
    };
  }

  const config = require(configPath);

  return extract(config);
};

module.exports = () => {
  const results = {
    jsconfig: processConfig(paths.jsconfig),
    tsconfig: processConfig(paths.tsconfig)
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
