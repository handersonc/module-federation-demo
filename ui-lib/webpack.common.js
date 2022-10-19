/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');


const webpack = require('webpack')
const path = require('path')

const toModulePath = (...parts) => path.resolve(__dirname, 'src', ...parts)

const MODULE_RESOLVE = {
  alias: {
    components: toModulePath('components'),
    router: toModulePath('router'),
    pages: toModulePath('pages'),

    hooks: toModulePath('hooks'),
    models: toModulePath('models'),

    queries: toModulePath('queries'),
    fragments: toModulePath('fragments'),
    mutations: toModulePath('mutations'),
    integrations: toModulePath('integrations'),

    assets: toModulePath('assets'),
    themes: toModulePath('themes'),

    i18n: toModulePath('i18n'),
    notifications: toModulePath('notifications'),
    services: toModulePath('services'),

    tests: toModulePath('tests'),
  }
}

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    ...MODULE_RESOLVE,
    extensions: ['.ts', '.tsx', '.js', '.json', '.cjs'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
        }
      },
      {
        test: /\.(graphql|gql)$/i,
        exclude: /node_modules/,
        resolve: {
          ...MODULE_RESOLVE,
          extensions: ['.gql', '.graphql']
        },
        use: ['graphql-tag/loader']
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new Dotenv(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
  }),
  ],
}