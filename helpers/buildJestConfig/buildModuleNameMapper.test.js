const path = require("path");
const runDir = process.env.PWD;

const buildMNM = require("./buildModuleNameMapper");

describe("buildModuleNameMapper", () => {
  const aliases = {
    "@config": path.join(runDir, "src/config.js"),
    "@constants": path.join(runDir, "src/constants"),
    "@helpers": path.join(runDir, "src/helpers")
  };

  test("should generate the right paths", () => {
    expect(buildMNM({ aliases })).toEqual({
      "^@config$": aliases["@config"],
      "^@constants(.*)$": aliases["@constants"] + "$1",
      "^@helpers(.*)$": aliases["@helpers"] + "$1"
    });
  });
});
