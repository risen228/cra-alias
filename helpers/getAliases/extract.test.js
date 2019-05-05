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

    expect(withAlias("@path/*", ["./path/*", "./path/"])).toEqual({
      "@path": "../src/path"
    });

    expect(withAlias("@config", ["./config.js"])).toEqual({
      "@config": "../src/config.js"
    });

    expect(withAlias("@path/*", ["./path/*"])).toEqual({
      "@path": "../src/path"
    });

    expect(withAlias("@path", ["./path"])).toEqual({
      "@path": "../src/path"
    });
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
      "@config": "../src/config.js",
      "@constants": "../src/constants",
      "@helpers": "../src/helpers"
    });
  });
});
