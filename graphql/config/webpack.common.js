// @flow

const path = require('path');

const appDirectory = path.resolve(__dirname, '..');

module.exports = {
  context: appDirectory,
  output: {
    path: path.resolve(appDirectory, 'dist'),
    filename: '[name].js',
  },
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
};
