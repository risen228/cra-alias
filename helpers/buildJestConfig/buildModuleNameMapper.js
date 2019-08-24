const path = require("path");

module.exports = ({ aliases }) => {
  const customModuleNameMapper = {};

  for (let aliasName in aliases) {
    const aliasPath = aliases[aliasName];

    let nameEnding = "$";
    let pathEnding = "";
    if (path.extname(aliasPath).length === 0) {
      nameEnding = "(.*)$";
      pathEnding = "$1";
    }

    customModuleNameMapper[`^${aliasName}${nameEnding}`] =
      path.normalize(aliasPath) + pathEnding;
  }

  return customModuleNameMapper;
};
