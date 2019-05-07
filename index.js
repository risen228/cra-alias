#!/usr/bin/env node

const scriptName = process.argv[2];

if (!["start", "test", "build"].includes(scriptName)) {
  console.log(`Unknown script "${scriptName}"`);
  process.exit();
}

const execute = require("./helpers/execute");
const envs = require("./constants/envs");

execute({
  scriptName,
  env: envs[scriptName]
});
