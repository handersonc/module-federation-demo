/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { MFLiveReloadPlugin } = require('@module-federation/fmr');

const port = 4001;


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    globalObject: 'this',
    publicPath: 'http://localhost:4001/',
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: 'index.html',
    },
    port,
    compress: true,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    // hot: true,
  },
  plugins: [
    new MFLiveReloadPlugin({
      port, // the port your app runs on
      container: 'reports', // the name of your app, must be unique
      standalone: false, // false uses chrome extention
    }),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
});
