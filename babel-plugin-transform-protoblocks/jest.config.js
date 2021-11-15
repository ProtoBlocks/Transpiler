module.exports = {
  testRegex: `./[^/]+/test/.+\\.m?js$`,
  testEnvironment: "node",
  moduleNameMapper: null,
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/fixtures/",
    "/test/debug-fixtures/",
    "/test/tmp/",
    "/test/__data__/",
    "/test/helpers/",
    "<rootDir>/test/warning\\.js",
    "<rootDir>/build/",
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "/test/(fixtures|tmp|__data__)/",
    "<rootDir>/[^/]+/lib/",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/test/(fixtures|tmp|__data__)/",
  ],
  modulePathIgnorePatterns: [
    "/test/fixtures/",
    "/test/tmp/",
    "/test/__data__/",
    "<rootDir>/build/",
  ],
  resolver: "./test/jestExportsMapResolver.cjs",
};
