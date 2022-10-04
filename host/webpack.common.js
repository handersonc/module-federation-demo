/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')

const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');

const toModulePath = (...parts) => path.resolve(__dirname, 'src', ...parts)

const MODULE_RESOLVE = {
  alias: {
    assets: toModulePath('assets'),
    components: toModulePath('components'),
    constants: toModulePath('constants'),
    hooks: toModulePath('hooks'),
    pages: toModulePath('pages'),
    router: toModulePath('router'),
    themes: toModulePath('themes'),
    utils: toModulePath('utils'),
    context: toModulePath('context'),
    reducers: toModulePath('reducers'),
    i18n: toModulePath('i18n'),
    tests: toModulePath('tests'),

    fragments: toModulePath('fragments'),
    mutations: toModulePath('mutations'),
    queries: toModulePath('queries'),

    bootstrap: toModulePath('bootstrap.tsx')
  }
}


module.exports = {
  entry: [toModulePath('index.ts')],
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
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js',
    publicPath: '/'
  },
  plugins: [
    new Dotenv(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
      ],
    }),
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1@http://localhost:4001/remoteEntry.js',
      },
      exposes: {
        './useAuthentication': './src/hooks/use-authentication'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '18.2.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true,
        },
        axios: {
          eager: true,
          requiredVersion: '^0.21.1'
        },
        '@fingerprintjs/fingerprintjs': {
          singleton: true,
          requiredVersion: '^3.3.4',
          eager: true,
        }
      },
    }),
  ],
  target: 'web'
}
