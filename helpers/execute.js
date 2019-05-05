const fs = require("fs");

const paths = {
  wpConfig: `react-scripts/config/webpack.config`,
  jsconfig: process.env.PWD + "/jsconfig.json",
  tsconfig: process.env.PWD + "/tsconfig.json"
};

const messages = {
  CONFIG_NOT_EXIST: "Config is not exist",
  BASE_URL_IS_UNDEFINED: "'compilerOptions.baseUrl' is not specified",
  PATHS_IS_UNDEFINED: "'compilerOptions.paths' is not specified"
};

const processConfig = configPath => {
  if (!fs.existsSync(configPath)) {
    return {
      result: "failure",
      message: messages.CONFIG_NOT_EXIST
    };
  }

  const config = require(configPath);

  const compilerOptions = config.compilerOptions || {};
  let { baseUrl, paths } = compilerOptions;

  if (!baseUrl) {
    return {
      result: "failure",
      message: messages.BASE_URL_IS_UNDEFINED
    };
  }

  if (!paths) {
    return {
      result: "failure",
      message: messages.PATHS_IS_UNDEFINED
    };
  }

  baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

  const aliases = {};

  for (let aliasName in paths) {
    aliasName = aliasName.replace("/*", "");
    const aliasPath = paths[aliasName];

    aliases[aliasName] = baseUrl + aliasPath;
  }

  return {
    result: "success",
    aliases
  };
};

const getAliases = () => {
  let idx;
  const jsconfigRes = processConfig(paths.jsconfig);
  const tsconfigRes = processConfig(paths.tsconfig);

  if (jsconfigRes.result !== "success" && tsconfigRes.result !== "success") {
    const configsNames = ["jsconfig.js", "tsconfig.js"];
    const resMessages = [jsconfigRes.message, tsconfigRes.message];

    if (resMessages.every(msg => msg === messages.CONFIG_NOT_EXIST)) {
      return {
        result: "failure",
        message: "No jsconfig.js or tsconfig.js in project directory"
      };
    }

    idx = resMessages.findIndex(msg => msg === messages.BASE_URL_IS_UNDEFINED);
    if (idx > -1) {
      return {
        result: "failure",
        message: `${configsNames[idx]}: ${messages.BASE_URL_IS_UNDEFINED}`
      };
    }

    idx = resMessages.findIndex(msg => msg === messages.PATHS_IS_UNDEFINED);
    if (idx > -1) {
      return {
        result: "failure",
        message: `${configsNames[idx]}: ${messages.PATHS_IS_UNDEFINED}`
      };
    }
  }

  const result = jsconfigRes.result === "success" ? jsconfigRes : tsconfigRes;

  return result;
};

module.exports = ({ scriptName, env }) => {
  process.env.NODE_ENV = env;

  const WPConfig = require(paths.wpConfig);

  require.cache[require.resolve(paths.wpConfig)].exports = env => {
    const defaultWPConfig = WPConfig(env);
    const aliasesRes = getAliases();

    if (aliasesRes.result !== "success") {
      console.log(aliasesRes.message);
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
