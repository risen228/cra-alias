const chalk = require("chalk");
const { errorsMessages } = require("../constants/errorsData");

module.exports = (key, params) => {
  const msg = errorsMessages[key];

  return {
    code: key,
    message: chalk.red(typeof msg === "function" ? msg(params) : msg) + "\n"
  };
};
