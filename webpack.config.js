const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const path = require("path");
var randomstring = require("randomstring");
module.exports = {
  //path to entry paint
  entry: "./src/index.js",
  //path and filename of the final output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `main-${randomstring.generate(4)}.js`,
  },
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
    },
  },
  plugins: [new NodePolyfillPlugin()],
};
