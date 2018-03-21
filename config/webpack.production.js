// @flow

const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, '..');

module.exports = () => ({
  context: appDirectory,
  entry: {
    lambda: './src/lambda.js',
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.IS_LAMBDA': JSON.stringify('true'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          babelrc: true,
        },
        include: [
          path.resolve(appDirectory, 'config'),
          path.resolve(appDirectory, 'src'),
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  target: 'node',
});
