const { merge } = require('webpack-merge')

const path = require('path')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('config')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { MFLiveReloadPlugin } = require('@module-federation/fmr');
const DEFAULT_DIST_SRC = config.get('distSrc')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: 'http://localhost:4001/'
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: 'index.html'
    },
    port: 4001,
    compress: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    hot: true,
    devMiddleware: {writeToDisk : true}
  },
  plugins: [
    new MFLiveReloadPlugin({
      port: 4001, // the port your app runs on
      container: "app1", // the name of your app, must be unique
      standalone: false, // false uses chrome extention
    }),
    new HtmlWebpackPlugin({
      template: './views/index.html',
      templateParameters: {
        INITIAL_DATA: JSON.stringify({
          bearerToken: ''
        }),
        'window.__INITIAL__DATA__': JSON.stringify({
          bearerToken: ''
        }),
        distSrc: DEFAULT_DIST_SRC
      }
    }),
    new webpack.DefinePlugin({
      'window.__INITIAL__DATA__': JSON.stringify({
        bearerToken: ''
      })
    }),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean)
})
