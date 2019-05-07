const { normalize } = require("path");
const isBaseUrlValid = require("./isBaseUrlValid");

describe("isBaseUrlValid", () => {
  test("should return right values", () => {
    const fn = (baseUrl, result) => {
      return expect(isBaseUrlValid(normalize(baseUrl))).toBe(result);
    };

    fn("src", true);
    fn("src/", true);
    fn("./src", true);
    fn("./src/", true);
    fn("src//////", true);
    fn("./src///", true);
    fn("./././src/../src", true);

    fn(".", false);
    fn("..", false);
    fn("../src", false);
    fn("any/incorrect/path", false);
    fn("src/something", false);
  });
});
