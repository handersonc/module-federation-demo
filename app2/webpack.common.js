const ConfigWebpackPlugin = require('config-webpack')
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path')
const webpack = require('webpack')
const toModulePath = (...parts) => path.resolve(__dirname, 'src', ...parts)

const MODULE_RESOLVE = {
  alias: {
    components: toModulePath('components'),
    containers: toModulePath('containers'),
    bootstrap: toModulePath('bootstrap.jsx')
  }
}

const JS_RULE = {
  test: /\.(js|jsx)$/i,
  exclude: /node_modules/,
  resolve: {
    ...MODULE_RESOLVE,
    extensions: ['.js', '.jsx']
  },
  use: ['babel-loader']
}

const CSS_RULE = {
  test: /.css$/i,
  use: ['style-loader', 'css-loader']
}

const GQL_RULE = {
  test: /\.(graphql|gql)$/i,
  exclude: /node_modules/,
  resolve: {
    ...MODULE_RESOLVE,
    extensions: ['.gql', '.graphql']
  },
  use: ['graphql-tag/loader']
}

const IMG_RULE = {
  test: /\.(png|jpe?g|gif|svg|tiff)$/i,
  use: ['file-loader']
}

module.exports = {
  entry: [toModulePath('index.js')],
  module: {
    rules: [JS_RULE, CSS_RULE, GQL_RULE, IMG_RULE]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new ConfigWebpackPlugin('APP_CONFIG'),
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      APP_NAME: JSON.stringify(process.env.npm_package_name),
      APP_VERSION: JSON.stringify(process.env.npm_package_version)
    }),
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './app2': 'bootstrap',
        './Login': 'components/Login.jsx'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '18.2.0',
        },
        "react-dom": {
          singleton: true,
          requiredVersion: '18.2.0',
        },
      },
    }),
  ],
  resolve: MODULE_RESOLVE,
  target: 'web'
}
