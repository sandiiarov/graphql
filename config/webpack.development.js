// @flow

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const path = require('path');

const appDirectory = path.resolve(__dirname, '..');

module.exports = () => {
  return webpackMerge.strategy({
    entry: 'replace',
  })(commonConfig, {
    entry: {
      endpoint: ['webpack/hot/poll?1000', './src/index'],
    },
    output: {
      path: path.resolve(appDirectory, 'dist'),
      hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
      hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    },
    plugins: [
      new StartServerPlugin('endpoint.js'),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?1000'],
      }),
    ],
    watch: true,
  });
};
