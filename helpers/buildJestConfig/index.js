const buildModuleNameMapper = require("./buildModuleNameMapper");

module.exports = ({ initialConfig, packageJsonJestConfig, aliases }) => {
  const customModuleNameMapper = buildModuleNameMapper({ aliases });

  return {
    ...initialConfig,
    moduleNameMapper: {
      ...initialConfig.moduleNameMapper,
      ...customModuleNameMapper
    },
    ...(packageJsonJestConfig || {})
  };
};
