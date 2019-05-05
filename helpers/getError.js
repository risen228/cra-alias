const { errorsMessages } = require("../constants/errorsData");

module.exports = (key, params) => {
  const msg = errorsMessages[key];

  return {
    code: key,
    message: typeof msg === "function" ? msg(params) : msg
  };
};
