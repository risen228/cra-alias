const { errorsMessages } = require("../constants/errorsData");

module.exports = (key, params) => {
  return {
    code: key,
    message: errorsMessages[key](params)
  };
};
