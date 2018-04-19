/* eslint-disable flowtype/require-valid-file-annotation */

process.env.NODE_ENV = 'production';

/**
 * Why is this test not part of test suite?
 *
 * Other tests check if it works programmatically but they are not testing the
 * real situation in production. On the other hand, this test expects that you
 * have build AWS Lambda functions first and then it tries to execute them.
 *
 * This is the last test before deployment and it's probably the most crucial.
 */

const tests = [
  {
    file: '../dist/lambda.js',
    handler: 'graphql',
    output: [],
  },
];

let logs = [];
// eslint-disable-next-line no-console
console.log = function(message) {
  logs.push(message);
};
const assert = require('assert');

for (const test of tests) {
  const lambda = require(test.file); // eslint-disable-line import/no-dynamic-require
  lambda[test.handler]({
    body: JSON.stringify({
      query: '{__typename}',
    }),
  });
  assert.deepStrictEqual(logs, test.output);
  logs = [];
}

process.exit(0);
