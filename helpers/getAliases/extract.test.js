const path = require("path");

const { errorsKeys } = require("../../constants/errorsData");

const extract = require("./extract");

describe("extract", () => {
  test(`should return ${errorsKeys.BASE_URL_IS_UNDEFINED} error`, () => {
    expect(
      extract({
        compilerOptions: {}
      }).error.code
    ).toBe(errorsKeys.BASE_URL_IS_UNDEFINED);
  });

  test(`should return ${errorsKeys.PATHS_IS_UNDEFINED} error`, () => {
    expect(
      extract({
        compilerOptions: {
          baseUrl: "src"
        }
      }).error.code
    ).toBe(errorsKeys.PATHS_IS_UNDEFINED);
  });

  test(`should return ${errorsKeys.INVALID_BASE_URL} error`, () => {
    expect(
      extract({
        compilerOptions: {
          baseUrl: "./invalid/path",
          paths: {}
        }
      }).error.code
    ).toBe(errorsKeys.INVALID_BASE_URL);
  });

  test(`should return ${errorsKeys.INVALID_ALIAS_PATHS} error`, () => {
    expect(
      extract({
        compilerOptions: {
          baseUrl: "src",
          paths: {
            "@some-alias": []
          }
        }
      }).error.code
    ).toBe(errorsKeys.INVALID_ALIAS_PATHS);

    expect(
      extract({
        compilerOptions: {
          baseUrl: "src",
          paths: {
            "@some-alias": "./some/alias/"
          }
        }
      }).error.code
    ).toBe(errorsKeys.INVALID_ALIAS_PATHS);
  });

  test("should work with any 'baseUrl' format", () => {
    const withBaseUrl = baseUrl =>
      extract({
        compilerOptions: {
          baseUrl,
          paths: {
            "@path/*": ["./path/*", "./path/"]
          }
        }
      }).aliases["@path"];

    const variants = [
      "src",
      "./src",
      "src/",
      "./src/",
      "././././src",
      "src/../src",
      "././src/../././src/."
    ];

    const answer = path.normalize("../src/path");

    for (let variant of variants) {
      expect(withBaseUrl(variant)).toBe(answer);
    }
  });

  test("should generate the right paths", () => {
    const withAlias = (pathName, pathValue) =>
      extract({
        compilerOptions: {
          baseUrl: "src",
          paths: {
            [pathName]: pathValue
          }
        }
      }).aliases;

    const pathAnswer = { "@path": path.normalize("../src/path") };
    const configAnswer = { "@config": path.normalize("../src/config.js") };

    const variants = [
      [["@path/*", ["./path/*", "./path/"]], pathAnswer],
      [["@path/*", ["./path/*"]], pathAnswer],
      [["@path", ["./path"]], pathAnswer],
      [["@path/*", ["./path/../path/*", "./path/"]], pathAnswer],
      [["@config", ["./config.js"]], configAnswer]
    ];

    for (let variant of variants) {
      expect(withAlias(...variant[0])).toEqual(variant[1]);
    }
  });

  test("should work with multiple aliases", () => {
    expect(
      extract({
        compilerOptions: {
          baseUrl: "src",
          paths: {
            "@config": ["./config.js"],
            "@constants/*": ["./constants/*", "./constants/"],
            "@helpers/*": ["./helpers/*", "./helpers/"]
          }
        }
      }).aliases
    ).toEqual({
      "@config": path.normalize("../src/config.js"),
      "@constants": path.normalize("../src/constants"),
      "@helpers": path.normalize("../src/helpers")
    });
  });
});
