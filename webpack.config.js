const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: ["@babel/polyfill", "./index.js"]
  },
  plugins: [new CleanWebpackPlugin(["dist"])],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["> 5%"]
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  output: {
    filename: "eth-key-lib-js-browser.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "production"
};
