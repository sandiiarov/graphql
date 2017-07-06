// @flow

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = () => {
  return webpackMerge.strategy({
    entry: 'replace',
  })(commonConfig, {
    entry: {
      lambda: './src/lambda.js',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new BabiliPlugin(
        {},
        {
          comments: false,
        }
      ),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
  });
};
