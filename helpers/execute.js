const path = require("path");

const paths = require("../constants/paths");
const getAliases = require("./getAliases");
const buildJestConfig = require("./buildJestConfig");

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

    const customJestConfig = buildJestConfig({
      initialConfig: defaultJestConfig,
      aliases: aliasesRes.aliases
    });

    require.cache[require.resolve(paths.createJestConfig)].exports = () =>
      customJestConfig;
  }

  require(paths.scripts + `/scripts/${scriptName}`);
};
