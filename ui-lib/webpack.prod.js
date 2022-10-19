/* eslint-disable @typescript-eslint/no-var-requires */
const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'REACT_APP_SUMADI_EXAMS_API': JSON.stringify(process.env.REACT_APP_SUMADI_EXAMS_API),
        'REACT_APP_SUMADI_EXAMS_AUTH_SERVICES_URL': JSON.stringify(process.env.REACT_APP_SUMADI_EXAMS_AUTH_SERVICES_URL),
        'REACT_APP_S2B_APP_DONWLOAD_URL': JSON.stringify(process.env.REACT_APP_S2B_APP_DONWLOAD_URL),
        'REACT_APP_SUMADI_BUCKET_EXAMS_AUDIO': JSON.stringify(process.env.REACT_APP_SUMADI_BUCKET_EXAMS_AUDIO),
        'REACT_APP_SUMADI_APP_SERVER_URL_V2': JSON.stringify(process.env.REACT_APP_SUMADI_APP_SERVER_URL_V2)
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
})