// @flow

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const developmentConfig = require('./webpack.development');

module.exports = () => {
  return webpackMerge.strategy({
    plugins: 'replace',
  })(developmentConfig(), {
    devtool: 'source-map',
    plugins: [
      // just remove StartServerPlugin
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  });
};
