const pluginTester = require("babel-plugin-tester").default;
const path = require("path");
const transform = require("../lib/index").default;

pluginTester({
  plugin: transform,
  fixtures: path.join(__dirname, "fixtures"),
  babelOptions: {
    parserOpts: {
      allowReturnOutsideFunction: true,
    },
  },
});
