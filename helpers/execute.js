const fs = require("fs");

const paths = {
  wpConfig: `react-scripts/config/webpack.config`,
  jsconfig: process.env.PWD + "/jsconfig.json",
  tsconfig: process.env.PWD + "/tsconfig.json"
};

const errorKeys = {
  CONFIG_NOT_EXIST: "CONFIG_NOT_EXIST",
  BASE_URL_IS_UNDEFINED: "BASE_URL_IS_UNDEFINED",
  PATHS_IS_UNDEFINED: "PATHS_IS_UNDEFINED",
  INVALID_ALIAS_PATHS: "INVALID_ALIAS_PATHS"
};

const errorMessages = {
  [errorKeys.CONFIG_NOT_EXIST]: () => "Config is not exist",
  [errorKeys.BASE_URL_IS_UNDEFINED]: () =>
    "'compilerOptions.baseUrl' is not specified",
  [errorKeys.PATHS_IS_UNDEFINED]: () =>
    "'compilerOptions.paths' is not specified",
  [errorKeys.INVALID_ALIAS_PATHS]: ({ aliasName }) =>
    `Invalid alias paths for '${aliasName}'`
};

const getError = (key, params) => {
  return {
    code: key,
    message: errorMessages[key](params)
  };
};

const processConfig = configPath => {
  if (!fs.existsSync(configPath)) {
    return {
      result: "failure",
      error: getError(errorKeys.CONFIG_NOT_EXIST)
    };
  }

  const config = require(configPath);

  const compilerOptions = config.compilerOptions || {};
  let { baseUrl, paths } = compilerOptions;

  if (!baseUrl) {
    return {
      result: "failure",
      error: getError(errorKeys.BASE_URL_IS_UNDEFINED)
    };
  }

  if (!paths) {
    return {
      result: "failure",
      error: getError(errorKeys.PATHS_IS_UNDEFINED)
    };
  }

  baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

  const aliases = {};

  for (let aliasName in paths) {
    const aliasPaths = paths[aliasName];

    if (!Array.isArray(aliasPaths) || aliasPaths.length < 1) {
      return {
        result: "failure",
        error: getError(errorKeys.INVALID_ALIAS_PATHS, { aliasName })
      };
    }

    const aliasPath = aliasPaths[0].endsWith("/*")
      ? aliasPaths[0].slice(-2)
      : aliasPaths[0].endsWith("/")
      ? aliasPath[0].slice(-1)
      : aliasPaths[0];

    const normalizedAliasName = aliasName.replace("/*", "");

    aliases[normalizedAliasName] = baseUrl + aliasPath;
  }

  return {
    result: "success",
    aliases
  };
};

const getAliases = () => {
  const results = {
    jsconfig: processConfig(paths.jsconfig),
    tsconfig: processConfig(paths.tsconfig)
  };

  const resultsValues = Object.values(results);

  if (resultsValues.every(r => r.result !== "success")) {
    if (resultsValues.every(r => r.error.code === errorKeys.CONFIG_NOT_EXIST)) {
      return {
        result: "failure",
        message: "No jsconfig.js or tsconfig.js in project directory"
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

module.exports = ({ scriptName, env }) => {
  process.env.NODE_ENV = env;

  const WPConfig = require(paths.wpConfig);

  require.cache[require.resolve(paths.wpConfig)].exports = env => {
    const defaultWPConfig = WPConfig(env);
    const aliasesRes = getAliases();

    if (aliasesRes.result !== "success") {
      console.log(aliasesRes.error.message);
      process.exit();
    }

    return {
      ...defaultWPConfig,
      resolve: {
        ...defaultWPConfig.resolve,
        alias: {
          ...defaultWPConfig.resolve.alias,
          ...aliasesRes.aliases
        }
      }
    };
  };

  require(`react-scripts/scripts/${scriptName}`);
};
