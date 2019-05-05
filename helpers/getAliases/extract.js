const path = require("path");

const { errorsKeys } = require("../../constants/errorsData");
const getError = require("../getError");

module.exports = config => {
  const compilerOptions = config.compilerOptions || {};
  let { baseUrl, paths } = compilerOptions;

  if (!baseUrl) {
    return {
      result: "failure",
      error: getError(errorsKeys.BASE_URL_IS_UNDEFINED)
    };
  }

  if (!paths) {
    return {
      result: "failure",
      error: getError(errorsKeys.PATHS_IS_UNDEFINED)
    };
  }

  if (!["src/", "node_modules/"].includes(path.normalize(baseUrl + "/"))) {
    return {
      result: "failure",
      error: getError(errorsKeys.INVALID_BASE_URL)
    };
  }

  const aliases = {};

  for (let aliasName in paths) {
    const aliasPaths = paths[aliasName];

    if (!Array.isArray(aliasPaths) || aliasPaths.length < 1) {
      return {
        result: "failure",
        error: getError(errorsKeys.INVALID_ALIAS_PATHS, { aliasName })
      };
    }

    const aliasPath = path.extname(aliasPaths[0]).length
      ? aliasPaths[0]
      : aliasPaths[0].endsWith("/*") || aliasPaths[0].endsWith("/")
      ? path.dirname(aliasPaths[0])
      : aliasPaths[0];

    const normalizedAliasName = aliasName.replace("/*", "");

    aliases[normalizedAliasName] = path.join("../", baseUrl, aliasPath);
  }

  return {
    result: "success",
    aliases
  };
};
