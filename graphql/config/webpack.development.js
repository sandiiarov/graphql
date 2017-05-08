// @flow

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const nodeExternals = require('webpack-node-externals');

module.exports = () => {
  return webpackMerge(commonConfig, {
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  });
};
