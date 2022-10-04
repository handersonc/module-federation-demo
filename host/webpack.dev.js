const { merge } = require("webpack-merge");

const path = require("path");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("config");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

const DEFAULT_DIST_SRC = config.get("distSrc");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    globalObject: "this",
    publicPath: "http://localhost:4000/",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    historyApiFallback: {
      index: "index.html",
    },
    port: 4000,
    compress: true,
    historyApiFallback: true,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    // hot: true,
  },
  plugins: [
    new MFLiveReloadPlugin({
      port: 4000, // the port your app runs on
      container: "host", // the name of your app, must be unique
      standalone: false, // false uses chrome extention
    }),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
});
