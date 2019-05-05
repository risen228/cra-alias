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

    // console.log({
    //   ...defaultWPConfig.resolve.alias,
    //   ...aliasesRes.aliases
    // });

    // process.exit();

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

  require(paths.scripts + `/scripts/${scriptName}`);
};
