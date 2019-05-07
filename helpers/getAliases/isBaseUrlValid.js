const { normalize: n } = require("path");

const validUrls = [n("src/"), n("node_modules/")];

module.exports = baseUrl => {
  const normalizedBaseUrl = n(baseUrl + "/");

  return validUrls.includes(normalizedBaseUrl);
};
