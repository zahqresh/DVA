const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    
    resolve: {
      fallback: {
        "http": require.resolve("stream-http")
      }
    },
    plugins: [
      new NodePolyfillPlugin()
    ],
  };