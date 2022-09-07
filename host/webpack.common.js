const ConfigWebpackPlugin = require('config-webpack')
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path')
const webpack = require('webpack')
const toModulePath = (...parts) => path.resolve(__dirname, 'src', ...parts)

const MODULE_RESOLVE = {
  alias: {
    assets: toModulePath('assets'),
    components: toModulePath('components'),
    containers: toModulePath('containers'),
    context: toModulePath('context'),
    constants: toModulePath('constants'),
    fragments: toModulePath('fragments'),
    hooks: toModulePath('hooks'),
    images: toModulePath('images'),
    mutations: toModulePath('mutations'),
    pages: toModulePath('pages'),
    queries: toModulePath('queries'),
    resolvers: toModulePath('resolvers'),
    schema: toModulePath('schema'),
    styles: toModulePath('styles'),
    theme: toModulePath('theme.js'),
    utils: toModulePath('utils'),
    bootstrap: toModulePath('bootstrap.js')
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
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        app1: 'app1@http://localhost:4001/remoteEntry.js',
      },
      exposes: {
        './useAuthentication': 'hooks/useAuthentication'
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
  resolve: MODULE_RESOLVE,
  target: 'web'
}
