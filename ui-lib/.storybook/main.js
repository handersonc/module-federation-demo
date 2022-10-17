const custom = require('../webpack.common.js');
const { merge } = require("webpack-merge");
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  webpackFinal: async config => {
    const conf =  merge(config, {
      resolve: custom.resolve
    });
    conf.module = { 
      rules: [
        {
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader'],
        },
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
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset/resource'
        },
        {
          test: /\.stories\.tsx?$/,
          use: [
            {
              loader: require.resolve('@storybook/source-loader'),
              options: { parser: 'typescript' },
            },
          ],
          enforce: 'pre',
        }
      ]
    };

    return conf;
  },
  core: {
    builder: "webpack5"
  },
  staticDirs: [{ from: '../src/assets', to: 'assets' }],
  framework: "@storybook/react",
  features: {
    storyStoreV7: true,
    emotionAlias: false,
    babelModeV7: true,
  },
}