const { normalize } = require("path");

const validUrls = [normalize("src/"), normalize("node_modules/")];

module.exports = baseUrl => {
  const normalizedBaseUrl = normalize(baseUrl + "/");

  return validUrls.includes(normalizedBaseUrl);
};
