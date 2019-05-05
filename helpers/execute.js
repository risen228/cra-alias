const path = require("path");

const paths = require("../constants/paths");
const getAliases = require("./getAliases");

module.exports = ({ scriptName, env }) => {
  process.env.NODE_ENV = env;

  const aliasesRes = getAliases();

  if (aliasesRes.result !== "success") {
    console.log(aliasesRes.error.message);
    process.exit();
  }

  const WPConfig = require(paths.wpConfig);

  require.cache[require.resolve(paths.wpConfig)].exports = env => {
    const defaultWPConfig = WPConfig(env);

    return {
      ...defaultWPConfig,
      resolve: {
        ...defaultWPConfig.resolve,
        alias: {
          ...defaultWPConfig.resolve.alias,
          ...aliasesRes.aliases
        }
      }
    };
  };

  if (scriptName === "test") {
    const packageJson = require(paths.packageJson);

    // hide package.json jest config from createJestConfig
    const savedPackageJsonJest = packageJson.jest;
    delete packageJson.jest;

    const createJestConfig = require(paths.createJestConfig);

    const defaultJestConfig = createJestConfig(
      relativePath =>
        path.resolve(paths.app, "node_modules", paths.scripts, relativePath),
      paths.app,
      false
    );

    // restore package.json jest config
    packageJson.jest = savedPackageJsonJest;

    require.cache[require.resolve(paths.createJestConfig)].exports = () => {
      const customModuleNameMap = {};
      for (let aliasName in aliasesRes.aliases) {
        const aliasPath = aliasesRes.aliases[aliasName];

        let nameEnding = "$";
        let pathEnding = "";
        if (path.extname(aliasPath).length === 0) {
          nameEnding = "(.*)$";
          pathEnding = "$1";
        }

        customModuleNameMap[`^${aliasName}${nameEnding}`] =
          "<rootDir>" + path.join(`/src/`, aliasPath) + pathEnding;
      }

      return {
        ...defaultJestConfig,
        moduleNameMapper: {
          ...defaultJestConfig.moduleNameMapper,
          ...customModuleNameMap
        }
      };
    };
  }

  require(paths.scripts + `/scripts/${scriptName}`);
};
