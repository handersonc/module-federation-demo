/* eslint-disable @typescript-eslint/no-var-requires */
const common = require('./webpack.common')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SUMADI_EXAMS_API': JSON.stringify(process.env.REACT_APP_SUMADI_EXAMS_API),
      'process.env.REACT_APP_SUMADI_EXAMS_AUTH_SERVICES_URL': JSON.stringify(process.env.REACT_APP_SUMADI_EXAMS_AUTH_SERVICES_URL),
      'process.env.REACT_APP_SUMADI_EXAMS_MICROSERVICES_URL': JSON.stringify(process.env.REACT_APP_SUMADI_EXAMS_MICROSERVICES_URL),
      'process.env.REACT_APP_FACULTY_FRONTEND_URL': JSON.stringify(process.env.REACT_APP_FACULTY_FRONTEND_URL),
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          }, {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
})