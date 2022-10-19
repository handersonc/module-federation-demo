/* eslint-disable @typescript-eslint/no-var-requires */
const {merge} = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    compress: true,
    https: false,
    historyApiFallback: true,
    hot: true,
    open: true
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 4003,
      openAnalyzer: false
    }),
    new ReactRefreshWebpackPlugin()
  ]
})