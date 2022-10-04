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
      filename: '[name].css',
      chunkFilename: 'source-map'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'REACT_APP_SUMADI_EXAMS_API': JSON.stringify(process.env.REACT_APP_SUMADI_EXAMS_API),
        'REACT_APP_SUMADI_EXAMS_AUTH_SERVICES_URL': JSON.stringify(process.env.REACT_APP_SUMADI_EXAMS_AUTH_SERVICES_URL),
        'REACT_APP_SUMADI_EXAMS_MICROSERVICES_URL': JSON.stringify(process.env.REACT_APP_SUMADI_EXAMS_MICROSERVICES_URL),
        'REACT_APP_ADMIN_ALLOWED_ROLES': JSON.stringify(process.env.REACT_APP_ADMIN_ALLOWED_ROLES),
        'REACT_APP_FACULTY_FRONTEND_URL': JSON.stringify(process.env.REACT_APP_FACULTY_FRONTEND_URL),
      }
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
