// @flow

import awsServerlessExpress from 'aws-serverless-express';
import app from './graphqlServer';

const server = awsServerlessExpress.createServer(app);
exports.graphql = (event: Object, context: ?Object) =>
  awsServerlessExpress.proxy(server, event, context);
