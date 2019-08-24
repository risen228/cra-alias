const buildModuleNameMapper = require("./buildModuleNameMapper");

module.exports = ({ initialConfig, aliases }) => {
  const customModuleNameMapper = buildModuleNameMapper({ aliases });

  return {
    ...initialConfig,
    moduleNameMapper: {
      ...initialConfig.moduleNameMapper,
      ...customModuleNameMap
    }
  };
};
