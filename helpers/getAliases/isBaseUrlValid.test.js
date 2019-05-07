const isBaseUrlValid = require("./isBaseUrlValid");

describe("isBaseUrlValid", () => {
  test("should return right values", () => {
    expect(isBaseUrlValid("src")).toBe(true);
    expect(isBaseUrlValid("src/")).toBe(true);
    expect(isBaseUrlValid("./src")).toBe(true);
    expect(isBaseUrlValid("./src/")).toBe(true);
    expect(isBaseUrlValid("src//////")).toBe(true);
    expect(isBaseUrlValid("./src///")).toBe(true);
    expect(isBaseUrlValid("./././src/../src")).toBe(true);

    expect(isBaseUrlValid(".")).toBe(false);
    expect(isBaseUrlValid("..")).toBe(false);
    expect(isBaseUrlValid("../src")).toBe(false);
    expect(isBaseUrlValid("any/incorrect/path")).toBe(false);
    expect(isBaseUrlValid("src/something")).toBe(false);
  });
});
