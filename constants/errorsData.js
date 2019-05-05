const errorsKeys = {
  CONFIG_NOT_EXIST: "CONFIG_NOT_EXIST",
  BASE_URL_IS_UNDEFINED: "BASE_URL_IS_UNDEFINED",
  INVALID_BASE_URL: "INVALID_BASE_URL",
  PATHS_IS_UNDEFINED: "PATHS_IS_UNDEFINED",
  INVALID_ALIAS_PATHS: "INVALID_ALIAS_PATHS",
  TSCONFIG_IS_NOT_EXTENDED: "TSCONFIG_IS_NOT_EXTENDED"
};

const errorsMessages = {
  [errorsKeys.CONFIG_NOT_EXIST]: "Config is not exist",
  [errorsKeys.BASE_URL_IS_UNDEFINED]:
    "'compilerOptions.baseUrl' is not specified",
  [errorsKeys.INVALID_BASE_URL]:
    "'baseUrl' should be one of: 'src', 'node_modules'",
  [errorsKeys.PATHS_IS_UNDEFINED]: "'compilerOptions.paths' is not specified",
  [errorsKeys.INVALID_ALIAS_PATHS]: ({ aliasName }) =>
    `Invalid alias paths for '${aliasName}'`,
  [errorsKeys.TSCONFIG_IS_NOT_EXTENDED]: "config is not extended"
};

exports.errorsKeys = errorsKeys;
exports.errorsMessages = errorsMessages;
