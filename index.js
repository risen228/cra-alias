#!/usr/bin/env node

const availableScripts = require("./constants/availableScripts");

const scriptName = process.argv[2];

if (!availableScripts.includes(scriptName)) {
  const getError = require("./helpers/getError");
  const { errorsKeys } = require("./constants/errorsData");

  const error = getError(errorsKeys.UNKNOWN_SCRIPT, {
    scriptName,
    availableScripts
  });
  
  console.log(error.message);
  process.exit();
}

const execute = require("./helpers/execute");
const envs = require("./constants/envs");

execute({
  scriptName,
  env: envs[scriptName]
});
